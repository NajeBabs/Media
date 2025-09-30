using MediaAPI.DTOs;

namespace MediaAPI.Services
{
    public interface IMediaItemService
    {
        Task<IEnumerable<MediaItemReadDto>> GetAllAsync();
        Task<MediaItemReadDto?> GetByIdAsync(int id);
        Task<MediaItemReadDto> AddAsync(MediaItemCreateDto dto);
        Task<MediaItemReadDto?> UpdateAsync(int id, MediaItemUpdateDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
