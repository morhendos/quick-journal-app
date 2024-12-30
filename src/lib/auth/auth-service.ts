import { CustomUser } from "@/types/auth";
import { AuthError } from "./validation";

// Development test users
const DEV_TEST_USERS = [
  {
    id: "1",
    email: "morhendos@gmail.com",
    password: "YourStrongPassword123!",
    name: "Test User 1",
    roles: [{ id: "1", name: "user" }],
  },
];

const USERS_STORAGE_KEY = 'journal_users';

interface StoredUser extends CustomUser {
  password: string;
}

function getStoredUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users: StoredUser[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
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
  password: string
): Promise<CustomUser> {
  // First try development test users
  if (process.env.NODE_ENV === 'development') {
    const testUser = DEV_TEST_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (testUser) {
      const { password: _, ...safeUserData } = testUser;
      return safeUserData;
    }
  }

  // Then check localStorage users
  const users = getStoredUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    const { password: _, ...safeUserData } = user;
    return safeUserData;
  }

  throw new AuthError('Invalid credentials', 'invalid_credentials');
}