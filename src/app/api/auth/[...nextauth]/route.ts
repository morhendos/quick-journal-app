import { auth } from '@/lib/auth/config';

export const { GET: AuthGet, POST } = auth;

export const GET = async (request: Request) => {
  const pathname = new URL(request.url).pathname;
  
  // If it's a session request, handle it specially
  if (pathname === '/api/auth/session') {
    return await AuthGet(request);
  }
  
  return await AuthGet(request);
};