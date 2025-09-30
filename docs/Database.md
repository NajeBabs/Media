# Database Schema

## MediaItems Table
- `Id INT IDENTITY PK`
- `Title NVARCHAR(200) NOT NULL`
- `YearReleased INT NOT NULL`
- `MediaType NVARCHAR(20) NOT NULL`
- `Status NVARCHAR(20) NOT NULL`
- `Rating TINYINT NULL`
- `Genres NVARCHAR(400) NULL`
- `CreatedAt DATETIME2 NOT NULL`
- `UpdatedAt DATETIME2 NOT NULL`
