# Validation Rules

- **Title**: Required, trimmed, collapse multiple spaces → reject empty  
- **YearReleased**: Must be 1888..2026  
- **Status**: Must be valid enum  
- **MediaType**: Must be valid enum  
- **Rating**: Must be 1–10; if Status = PlanToWatch → must be null (server should force null or reject)  
- **Genres**: Split by comma, trim tokens, rejoin with comma+space  
- **Search (q)**: Case-insensitive substring on normalized Title  
