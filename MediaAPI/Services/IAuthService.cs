using MediaAPI.Models;

namespace MediaAPI.Services;

public interface IAuthService
{
    void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt);
    string CreateToken(Fan fan);
}