import { NextResponse } from "next/server";

// Server-side active session store (sessionId -> lastSeenTimestamp)
const activeSessions = new Map<string, number>();

function cleanupStaleSessions() {
  const now = Date.now();
  for (const [id, lastSeen] of activeSessions.entries()) {
    if (now - lastSeen > 15000) {
      activeSessions.delete(id);
    }
  }
}

export async function GET() {
  cleanupStaleSessions();
  return NextResponse.json({ count: Math.max(1, activeSessions.size) });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const sessionId = body.sessionId || `session_${Math.random().toString(36).substring(2)}`;
    
    activeSessions.set(sessionId, Date.now());
    cleanupStaleSessions();

    return NextResponse.json({
      count: Math.max(1, activeSessions.size),
      sessionId,
    });
  } catch (error) {
    return NextResponse.json({ count: 1 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.sessionId) {
      activeSessions.delete(body.sessionId);
    }
    cleanupStaleSessions();
    return NextResponse.json({ count: Math.max(1, activeSessions.size) });
  } catch (error) {
    return NextResponse.json({ count: 1 });
  }
}
