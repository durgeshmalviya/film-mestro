import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
  jwtSigningKey: process.env.MUX_SIGNING_KEY!,
  jwtPrivateKey: process.env.MUX_PRIVATE_KEY!,
});

export async function POST(request: Request) {
  try {
    const { playbackId } = await request.json();

    if (!playbackId) {
      return NextResponse.json(
        { error: "Playback ID is required" },
        { status: 400 }
      );
    }

    const token = await mux.jwt.signPlaybackId(playbackId, {
      expiration: "24h",
      type: "video",
    });

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("Mux token generation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate token" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST with { playbackId: '...' } in body" },
    { status: 405 }
  );
}