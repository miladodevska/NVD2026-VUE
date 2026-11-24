// Open Library covers: S = small, M = medium, L = large
export function coverUrl(coverId, size = 'M') {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}
