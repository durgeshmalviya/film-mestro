import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

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

    // Basic path validation
    if (!path.startsWith("/") || path.includes("..")) {
      return NextResponse.json(
        { error: "Invalid path format" },
        { status: 400 }
      );
    }

    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      console.error("Missing IMAGEKIT_PRIVATE_KEY");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const url = imagekit.url({
      path,
      signed: true,
      expireSeconds: 300,
      transformation: [
        {
          width: 800,
          height: 1067,
          focus: "auto",
          quality: 80,
          format: "webp",
        },
      ],
    });

    return NextResponse.json(
      { url },
      {
        headers: {
          "Cache-Control": "public, max-age=250, s-maxage=250",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("ImageKit generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL", details: String(error) },
      { status: 500 }
    );
  }
}