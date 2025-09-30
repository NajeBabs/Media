using System.ComponentModel.DataAnnotations;
using MediaAPI.Models;

namespace MediaAPI.DTOs
{
    public class MediaItemUpdateDto
    {
        [Required]
        [StringLength(200, MinimumLength = 1)]
        public string Title { get; set; } = string.Empty;

        [Range(1888, 3000)]
        public int YearReleased { get; set; }

        public string? Genres { get; set; }

        [Required]
        public MediaType MediaType { get; set; }

        [Required]
        public WatchStatus Status { get; set; }

        [Range(1, 10)]
        public int? Rating { get; set; }
    }
}
