import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    // TODO: Implement MongoDB integration
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // TODO: Implement MongoDB integration
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}
