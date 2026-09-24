import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("path");
    const width = searchParams.get("w") || "1400";
    const quality = searchParams.get("q") || "auto:good";

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    // Basic security
    if (path.includes("..")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Generate signed URL
    const url = cloudinary.url(path, {
      type: "upload",
      sign_url: true,
      secure: true,
      transformation: [
        {
          width: Number(width),
          crop: "limit",
          quality: quality,
          fetch_format: "auto",
        },
      ],
    });

    return NextResponse.json(
      { url },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=300",
        },
      }
    );
  } catch (error) {
    console.error("Cloudinary signed URL error:", error);
    return NextResponse.json(
      { error: "Failed to generate signed URL" },
      { status: 500 }
    );
  }
}