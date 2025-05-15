import MediaPage from "@/components/media/media-page";
import { notFound } from "next/navigation";

export default async function TvCategoryPage({ params, searchParams }) {
  const { category } = await params;
  const pageParams = await searchParams;
  const validTypes = ["popular", "top-rated", "airing-today", "on-the-air", "trending"];
  if (!validTypes.includes(category)) {
    notFound();
  }

  return <MediaPage mediaType="tv" categoryType={category} searchParams={pageParams} />;
}
