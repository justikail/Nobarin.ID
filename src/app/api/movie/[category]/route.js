import { tmdbRequest } from "@/lib/tmdb-request";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

const validCategories = ["popular", "top-rated", "now-playing", "upcoming", "trending"];

export async function GET(request, { params }) {
  try {
    let { category } = await params;
    const tmdbCategory = category.replace(/-/g, "_");

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        {
          status: 404,
          success: false,
          error: "API route not found",
        },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const language = searchParams.get("language") || "en-US";
    const region = searchParams.get("region") || "ID";

    if (category === "trending") {
      const data = await tmdbRequest("trending/movie/week", "GET", {
        language,
      });
      return NextResponse.json({
        status: 200,
        success: true,
        ...data,
      });
    }

    const data = await tmdbRequest(`movie/${tmdbCategory}`, "GET", {
      language,
      region,
      page,
    });

    return NextResponse.json(
      {
        status: 200,
        success: true,
        ...data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: error.message || "Failed to fetch data",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
