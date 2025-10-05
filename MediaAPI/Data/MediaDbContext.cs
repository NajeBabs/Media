using Microsoft.EntityFrameworkCore;
using MediaAPI.Models;

namespace MediaAPI.Data
{
    public class MediaDbContext : DbContext
    {
        public MediaDbContext(DbContextOptions<MediaDbContext> options) : base(options) { }

        public DbSet<MediaItem> MediaItems { get; set; }
        public DbSet<Fan> Fans { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MediaItem>()
                .HasOne(m => m.Fan)
                .WithMany()
                .HasForeignKey(m => m.FanId);
        }
    }
}
