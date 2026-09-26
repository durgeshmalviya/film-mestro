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
    const folder = searchParams.get("folder") || "Catalogues";

    const allowed = [
      "Catalogues",
      "Editorial",
      "HFashion",
      "Product",
    ];

    if (!allowed.includes(folder)) {
      return NextResponse.json({ error: "Folder not allowed" }, { status: 400 });
    }

    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .with_field("context")
      .with_field("tags")                 // ← added: returns tags
      .sort_by("created_at", "desc")
      .max_results(80)
      .execute();

    const images = result.resources.map((r: any) => ({
      path: r.public_id,
      alt: r.context?.custom?.alt || r.filename || r.public_id.split("/").pop(),
      width: r.width || 1200,
      height: r.height || 1600,
      tags: r.tags || [],                 // ← added
    }));

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Cloudinary list error:", error);
    return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
  }
}