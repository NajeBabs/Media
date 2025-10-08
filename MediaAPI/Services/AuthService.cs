using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using MediaAPI.Models;

namespace MediaAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;

        public AuthService(IConfiguration config)
        {
            _config = config;
        }

        // Create password hash + salt
        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();                                      // generates a random Key — this will serve as your password salt.
            passwordSalt = hmac.Key;                                                // ensures that even if two users have the same password, their hashes will be completely different.
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));      // computes the hash of the password combined with the salt.
        }

        // Verify password against hash + salt
        public bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            using var hmac = new HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(storedHash);
        }

        // Generate JWT token
        public string CreateToken(Fan fan)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, fan.Id.ToString()),
                new Claim(ClaimTypes.Name, fan.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );
            // “I’m user ID 1, username ‘naje’, and my session is valid until 1 hour from now — signed by the backend.”

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
