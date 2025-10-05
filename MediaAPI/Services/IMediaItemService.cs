using MediaAPI.DTOs;

namespace MediaAPI.Services
{
    public interface IMediaItemService
    {
        Task<IEnumerable<MediaItemReadDto>> GetAllAsync(int fanId);
        Task<MediaItemReadDto?> GetByIdAsync(int id, int fanId);
        Task<MediaItemReadDto> AddAsync(MediaItemCreateDto dto, int fanId);
        Task<MediaItemReadDto?> UpdateAsync(int id, MediaItemUpdateDto dto, int fanId);
        Task<bool> DeleteAsync(int id, int fanId);
    }
}
