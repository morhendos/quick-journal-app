import { CustomUser } from "@/types/auth";
import { AuthError } from "./validation";

const USERS_STORAGE_KEY = 'journal_users';

interface StoredUser extends CustomUser {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error reading users from storage:', error);
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to storage:', error);
  }
}

export async function registerUser(
  email: string,
  password: string,
  name?: string
): Promise<CustomUser> {
  const users = getStoredUsers();
  
  if (users.some(user => user.email === email)) {
    throw new AuthError('Email already registered', 'invalid_credentials');
  }

  const newUser: StoredUser = {
    id: Date.now().toString(),
    email,
    password,
    name: name || email.split('@')[0],
    roles: [{ id: '1', name: 'user' }],
  };

  users.push(newUser);
  saveUsers(users);

  const { password: _, ...safeUserData } = newUser;
  return safeUserData;
}

export async function authenticateUser(
  email: string,
  password: string,
  usersJson?: string
): Promise<CustomUser> {
  let users: StoredUser[] = [];

  // Try to parse users from provided JSON first
  if (usersJson) {
    try {
      users = JSON.parse(usersJson);
    } catch (error) {
      console.error('Error parsing users JSON:', error);
    }
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const { password: _, ...safeUserData } = user;
    return safeUserData;
  }

  throw new AuthError('Invalid credentials', 'invalid_credentials');
}
