// app/api/mux-token/route.ts
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
  jwtSigningKey: process.env.MUX_SIGNING_KEY!,   // Key ID
  jwtPrivateKey: process.env.MUX_PRIVATE_KEY!,   // Private key
});

export async function GET() {
  try {
    const playbackId = "D00CmCs5015a02fv00402zFnAeh3gcG5O3rIQnEzjrCbNi9E";

    const token = await mux.jwt.signPlaybackId(playbackId, {
      expiration: "1h",
      type: "video",
    });

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("FULL MUX ERROR:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to sign token" },
      { status: 500 }
    );
  }
}