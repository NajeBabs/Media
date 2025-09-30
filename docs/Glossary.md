# Glossary

**MediaType (enum)**  
- `Movie`  
- `TVSeries`  
- `Anime`  

**Status (enum)**  
- `PlanToWatch`  
- `Watching`  
- `Watched`  
- `Dropped`  

**Rating (nullable int)**  
- Range: `1–10` inclusive  
- Must be null when Status = `PlanToWatch`  

**YearReleased (int)**  
- Valid range: `1888..2026`  

**Genres (string)**  
- Comma-separated, trimmed names (e.g., `"Action, Sci-Fi"`)  
- Case-insensitive  

**Title (string)**  
- Required, length `1..200`  
- Trimmed, collapse multiple whitespace  
