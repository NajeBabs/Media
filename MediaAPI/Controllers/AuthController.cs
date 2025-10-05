using Microsoft.AspNetCore.Mvc;
using MediaAPI.Models;
using MediaAPI.DTOs;
using MediaAPI.Data;
using MediaAPI.Services;

namespace MediaAPI.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly MediaDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(MediaDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        // ---------------- REGISTER ----------------
        [HttpPost("register")]
        public IActionResult Register(RegisterDto request)
        {
            if (_context.Fans.Any(f => f.Username == request.Username))
                return BadRequest("Fan already exists");

            _authService.CreatePasswordHash(request.Password, out byte[] hash, out byte[] salt);

            var fan = new Fan
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Username = request.Username,
                PasswordHash = hash,
                PasswordSalt = salt
            };

            _context.Fans.Add(fan);
            _context.SaveChanges();

            return Ok("Fan registered!");
        }

        // ---------------- LOGIN ----------------
        [HttpPost("login")]
        public IActionResult Login(LoginDto request)
        {
            var fan = _context.Fans.SingleOrDefault(f => f.Username == request.Username);
            if (fan == null)
                return BadRequest("User not found");

            if (!_authService.VerifyPasswordHash(request.Password, fan.PasswordHash, fan.PasswordSalt))
                return BadRequest("Wrong password");

            string token = _authService.CreateToken(fan);

            return Ok(new { Token = token });
        }
    }
}
