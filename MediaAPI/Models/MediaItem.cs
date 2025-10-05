namespace MediaAPI.Models
{
    public class MediaItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public int YearReleased { get; set; }

        public string? Genres { get; set; }

        public MediaType MediaType { get; set; }

        public WatchStatus Status { get; set; }

        public int? Rating { get; set; } // allowed only if status is Watching, Watched, Dropped

        // 🔑 New fields
        public int FanId { get; set; }
        public Fan Fan { get; set; } = null!;
    }
}
