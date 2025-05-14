import { tmdbRequest } from "@/lib/tmdb-request";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const language = searchParams.get("language") || "en-US";

    const data = await tmdbRequest("tv/popular", "GET", {
      language,
      page,
    });

    return NextResponse.json({
      status: 200,
      success: true,
      ...data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: error.message || "Failed to fetch popular tv",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
