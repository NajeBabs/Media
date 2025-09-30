using MediaAPI.Models;

namespace MediaAPI.DTOs
{
    public class MediaItemReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int YearReleased { get; set; }
        public string? Genres { get; set; }
        public MediaType MediaType { get; set; }
        public WatchStatus Status { get; set; }
        public int? Rating { get; set; }
    }
}
