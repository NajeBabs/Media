using MediaAPI.Data;
using MediaAPI.DTOs;
using MediaAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MediaAPI.Services
{
    public class MediaItemService : IMediaItemService
    {
        private readonly MediaDbContext _context;

        public MediaItemService(MediaDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MediaItemReadDto>> GetAllAsync(int fanId)
        {
            return await _context.MediaItems
                .Where(m => m.FanId == fanId) // filter by user
                .Select(m => new MediaItemReadDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    YearReleased = m.YearReleased,
                    Genres = m.Genres,
                    MediaType = m.MediaType,
                    Status = m.Status,
                    Rating = m.Rating
                })
                .ToListAsync();
        }

        public async Task<MediaItemReadDto?> GetByIdAsync(int id, int fanId)
        {
            var m = await _context.MediaItems
                .FirstOrDefaultAsync(i => i.Id == id && i.FanId == fanId);

            if (m == null) return null;

            return new MediaItemReadDto
            {
                Id = m.Id,
                Title = m.Title,
                YearReleased = m.YearReleased,
                Genres = m.Genres,
                MediaType = m.MediaType,
                Status = m.Status,
                Rating = m.Rating
            };
        }

        public async Task<MediaItemReadDto> AddAsync(MediaItemCreateDto dto, int fanId)
        {
            var m = new MediaItem
            {
                Title = dto.Title.Trim(),
                YearReleased = dto.YearReleased,
                Genres = dto.Genres,
                MediaType = dto.MediaType,
                Status = dto.Status,
                Rating = dto.Status == WatchStatus.PlanToWatch ? null : dto.Rating,
                FanId = fanId
            };

            _context.MediaItems.Add(m);
            await _context.SaveChangesAsync();

            return new MediaItemReadDto
            {
                Id = m.Id,
                Title = m.Title,
                YearReleased = m.YearReleased,
                Genres = m.Genres,
                MediaType = m.MediaType,
                Status = m.Status,
                Rating = m.Rating
            };
        }

        public async Task<MediaItemReadDto?> UpdateAsync(int id, MediaItemUpdateDto dto, int fanId)
        {
            var m = await _context.MediaItems
                .FirstOrDefaultAsync(i => i.Id == id && i.FanId == fanId);

            if (m == null) return null;

            m.Title = dto.Title.Trim();
            m.YearReleased = dto.YearReleased;
            m.Genres = dto.Genres;
            m.MediaType = dto.MediaType;
            m.Status = dto.Status;
            m.Rating = dto.Status == WatchStatus.PlanToWatch ? null : dto.Rating;

            await _context.SaveChangesAsync();

            return new MediaItemReadDto
            {
                Id = m.Id,
                Title = m.Title,
                YearReleased = m.YearReleased,
                Genres = m.Genres,
                MediaType = m.MediaType,
                Status = m.Status,
                Rating = m.Rating
            };
        }

        public async Task<bool> DeleteAsync(int id, int fanId)
        {
            var m = await _context.MediaItems
                .FirstOrDefaultAsync(i => i.Id == id && i.FanId == fanId);

            if (m == null) return false;

            _context.MediaItems.Remove(m);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
