export function getGenreNames(genreIds, allGenres) {
  return genreIds
    .map((id) => allGenres.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");
}
