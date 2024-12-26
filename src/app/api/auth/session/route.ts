import { getServerSession } from 'next-auth';
import { config } from '@/lib/auth/config';

export async function GET() {
  const session = await getServerSession(config);
  return Response.json(session);
}