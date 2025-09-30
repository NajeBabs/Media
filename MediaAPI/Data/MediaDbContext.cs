using Microsoft.EntityFrameworkCore;
using MediaAPI.Models;

namespace MediaAPI.Data
{
    public class MediaDbContext : DbContext
    {
        public MediaDbContext(DbContextOptions<MediaDbContext> options) : base(options) { }

        public DbSet<MediaItem> MediaItems { get; set; }
    }
}
