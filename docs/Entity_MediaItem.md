# Entity: MediaItem

Represents a single item (Movie, TVSeries, Anime) in the collection.

## Fields
- `Id: int`
- `Title: string (required)`
- `YearReleased: int (1888..2026)`
- `MediaType: string (Movie, TVSeries, Anime)`
- `Status: string (PlanToWatch, Watching, Watched, Dropped)`
- `Rating: nullable int (1–10 only if allowed)`
- `Genres: string (nullable; comma-separated)`
- `CreatedAt: DateTime (UTC, server-set)`
- `UpdatedAt: DateTime (UTC, server-set)`

## Invariants
- **Rating Rule**: Rating is only set when `Status ∈ {Watching, Watched, Dropped}`; else Rating = null.  
- **Rating Range**: If Rating is not null, it must be between 1–10.  
- **Duplicates**: Soft policy – duplicates allowed, but server returns 409 with a hint unless client passes `?allowDuplicate=true`.  
