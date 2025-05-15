import { NextResponse } from "next/server";

// Dummy user data
const DUMMY_USERS = [
  {
    id: 1,
    email: "test@example.com",
    password: "Password!123",
    name: "Test User",
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate request body
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // In a real application, you would:
    // 1. Hash the password
    // 2. Generate a JWT token
    // 3. Set secure HTTP-only cookies
    // 4. Implement proper session management

    // For this dummy implementation, we'll just return a success response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
