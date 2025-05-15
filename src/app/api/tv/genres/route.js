import { tmdbRequest } from "@/lib/tmdb-request";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await tmdbRequest("genre/tv/list", "GET");

    return NextResponse.json(
      {
        status: 200,
        success: true,
        results: data.genres,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: error.message || "Failed to fetch genre list movies",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
