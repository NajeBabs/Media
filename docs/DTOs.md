# Data Transfer Objects (DTOs)

## CreateMediaItemRequest
- `title` (required)
- `yearReleased` (required)
- `mediaType` (required)
- `status` (required)
- `rating` (nullable)
- `genres` (string, optional)
- `notes` (string, optional)

## UpdateMediaItemRequest
- Same fields as Create
- All optional, at least one must be supplied

## MediaItemResponse
- Returns all MediaItem fields
- Includes `id`, `createdAt`, `updatedAt`

## ErrorResponse
```json
{
  "code": "ValidationError",
  "errors": [
    { "field": "rating", "message": "Rating not allowed for PlanToWatch" }
  ]
}
