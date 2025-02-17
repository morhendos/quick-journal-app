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
    throw new AuthError('This email is already registered. Please use a different email or log in.', 'invalid_credentials');
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

  try {
    if (usersJson) {
      users = JSON.parse(usersJson);
    }

    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new AuthError('No account found with this email. Please check your email or create a new account.', 'invalid_credentials');
    }

    if (user.password !== password) {
      throw new AuthError('Incorrect password. Please try again.', 'invalid_credentials');
    }

    const { password: _, ...safeUserData } = user;
    return safeUserData;

  } catch (error) {
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Something went wrong. Please try again.', 'invalid_credentials');
  }
}