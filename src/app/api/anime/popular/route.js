import { animeRequest } from "../../../../lib/anime-request";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await animeRequest("trending", "GET");

    return NextResponse.json({
      status: 200,
      success: true,
      results: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        success: false,
        error: error.message || "Failed to fetch playing movies",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
