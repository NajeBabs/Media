# Acceptance Tests

## 1. Rating Rule Enforced
**Given**: status = PlanToWatch, rating = 7  
**When**: Create item  
**Then**: Server sets rating = null, return message “Update status before setting rating”

## 2. Genre Filter
**Given**: Genres = "Action, Sci-Fi"  
**When**: genre = sci-fi  
**Then**: Item returns (case-insensitive match)

## 3. Sorting by Year
**Given**: Items with different YearReleased values  
**When**: sortBy=YearReleased&sortDir=desc  
**Then**: Items returned sorted by Year descending, then Title ascending
