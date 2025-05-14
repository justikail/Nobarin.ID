function formattedTitle(type, id = null, title) {
  return `/detail/${type}/${id ? `${id}-` : ""}${title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "-")
    .replace(/\s+/g, "-")}`;
}

function formattedDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

// function formattedGenre({ malId, genreName }) {
//   return `/genre/${malId}/${genreName
//     .toLowerCase()
//     .replace(/[^\w\s]/gi, "_")
//     .replace(/\s+/g, "_")}`;
// }

// function formattedStudio({ malId, title }) {
//   return `/producer/${malId}/${title
//     .toLowerCase()
//     .replace(/[^\w\s]/gi, "_")
//     .replace(/\s+/g, "_")}`;
// }

export { formattedTitle, formattedDate };
