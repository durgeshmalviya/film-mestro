import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

// Initialize once at module level (not inside the handler)
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");

    if (!path) {
      return NextResponse.json(
        { error: "path parameter required" },
        { status: 400 }
      );
    }

    // Security: only allow paths that start with / and never contain ..
    if (!path.startsWith("/") || path.includes("..")) {
      return NextResponse.json(
        { error: "Invalid path format" },
        { status: 400 }
      );
    }

    // Check required env vars
    if (
      !process.env.IMAGEKIT_PRIVATE_KEY ||
      !process.env.IMAGEKIT_PUBLIC_KEY ||
      !process.env.IMAGEKIT_URL_ENDPOINT
    ) {
      console.error("Missing ImageKit environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Generate signed URL (expires in 5 minutes)
    // Transformations keep bandwidth low → free-plan friendly
    const url = imagekit.url({
      path,
      signed: true,
      expireSeconds: 300, // 5 minutes
      transformation: [
        {
          width: 1200,        // good quality for hero
          height: 1600,
          focus: "auto",
          quality: 80,
          format: "webp",     // much smaller than jpg
        },
      ],
    });

    return NextResponse.json(
      { url },
      {
        headers: {
          // Cache the signed URL for almost the full lifetime
          "Cache-Control": "public, max-age=250, s-maxage=250",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("ImageKit generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate signed URL",
        details: String(error),
      },
      { status: 500 }
    );
  }
}