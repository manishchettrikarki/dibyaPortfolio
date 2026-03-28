import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USERNAME || 'admin';
    const validPass = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === validUser && password === validPass) {
      // Simple signed token — timestamp:username base64
      const token = Buffer.from(`${Date.now()}:${username}:portfolio_admin`).toString('base64');
      return NextResponse.json({ success: true, token });
    }

    return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
