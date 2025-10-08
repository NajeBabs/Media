using MediaAPI.DTOs;
using MediaAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace MediaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MediaItemsController : ControllerBase
    {
        private readonly IMediaItemService _service;
        public MediaItemsController(IMediaItemService service) => _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediaItemReadDto>>> GetAll()
        {
            var fanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(await _service.GetAllAsync(fanId));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MediaItemReadDto>> GetById(int id)
        {
            var fanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var item = await _service.GetByIdAsync(id, fanId);
            if (item == null) return NotFound();  // <-- translates business result to HTTP
            return Ok(item);

        }

        [HttpPost]
        public async Task<ActionResult<MediaItemReadDto>> Create(MediaItemCreateDto dto)
        {
            var fanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var created = await _service.AddAsync(dto, fanId);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MediaItemReadDto>> Update(int id, MediaItemUpdateDto dto)
        {
            var fanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var updated = await _service.UpdateAsync(id, dto, fanId);
            if (updated == null) return NotFound(); // 404 for frontend clarity
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var fanId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var deleted = await _service.DeleteAsync(id, fanId);
            if (!deleted) return NotFound();  // 404 for frontend clarity
            return NoContent();               // 204 for success

        }
    }
}
