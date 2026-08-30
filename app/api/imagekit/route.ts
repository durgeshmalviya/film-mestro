// app/api/imagekit-sign/route.ts
import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // never expose this
  urlEndpoint: "https://ik.imagekit.io/maestrofilms",
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }

  // Optional: basic protection – only allow specific folders
  if (!path.startsWith("/") || path.includes("..")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    const url = imagekit.url({
      path, // e.g. /MF_08942.jpg or /photosmestro/MF_08320.jpg
      signed: true,
      expireSeconds: 300, // 5 minutes (keep short for better security)
      transformation: [
        {
          width: 800,
          height: 1067,
          focus: "auto",
          quality: 80,
          format: "webp", // smaller + harder to steal original
        },
      ],
    });

    return NextResponse.json(
      { url },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "CDN-Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("ImageKit error:", error);
    return NextResponse.json({ error: "Failed to generate URL" }, { status: 500 });
  }
}