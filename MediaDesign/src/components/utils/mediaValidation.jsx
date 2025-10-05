// Clean genres into a consistent format
export function cleanGenres(genres) {
  if (!genres) return ""
  return genres
    .replace(/\s*,\s*/g, ",") // trim spaces around commas
    .replace(/\s+/g, " ")     // collapse multiple spaces
    .trim()
    .split(/[, ]+/)           // split on commas OR spaces
    .filter((g) => g.trim() !== "")
    .join(",")
}

// Validate media item before save
export function validateMedia(item) {
  const errors = {}

  // Title: required, 1–200 chars
  if (!item.title || item.title.trim().length === 0) {
    errors.title = "Title is required."
  } else if (item.title.length > 200) {
    errors.title = "Title must be 1–200 characters."
  }

  // YearReleased: 1888 to currentYear+1
  const currentYear = new Date().getFullYear()
  if (!item.yearReleased || isNaN(item.yearReleased)) {
    errors.yearReleased = "Year is required."
  } else if (item.yearReleased < 1888 || item.yearReleased > currentYear + 1) {
    errors.yearReleased = `Year must be between 1888 and ${currentYear + 1}.`
  }

  // Rating: only if status = Watching, Watched, Dropped
  if ([1, 2, 3].includes(Number(item.status))) {
    if (item.rating == null || item.rating === "") {
      errors.rating = "Rating is required for this status."
    } else if (item.rating < 1 || item.rating > 10) {
      errors.rating = "Rating must be between 1 and 10."
    }
  }

  return errors
}
