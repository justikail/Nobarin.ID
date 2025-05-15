import MediaPage from "@/components/media/media-page";
import { notFound } from "next/navigation";

export default async function MovieCategoryPage({ params, searchParams }) {
  const { category } = await params;
  const pageParams = await searchParams;
  const validTypes = ["popular", "top-rated", "now-playing", "upcoming", "trending"];
  if (!validTypes.includes(category)) {
    notFound();
  }

  return <MediaPage mediaType="movie" categoryType={category} searchParams={pageParams} />;
}
