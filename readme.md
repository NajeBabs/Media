# 🎬 Media Collection (Full Stack Project)

A **mini full-stack project** to track a single user’s **Movies, TV Series, and Anime list**.  
Built with **ASP.NET Core Web API**, **Entity Framework Core**, **MSSQL**, **React + Vite**, and **TailwindCSS v4**, containerized with **Docker**.

---

## 👩‍💻 Author
**Name:** Jaryl Jane Baroro  
**Project Type:** Mini Full Stack Project

---

## 🚀 Features (Phase 1)
- ✅ CRUD operations for media items  
- 🔍 Filter by **status**, **mediaType**, **year**, or **genre**  
- 📝 Free-text search on title  
- ⚙️ Sort by **YearReleased**, **MediaType**, or **Status**  
- 📄 Pagination support  
- 🧩 Basic validation rules (rating, year, duplicates)  
- 🔐 Authentication (Register & Login with JWT)  
- 🌐 Swagger UI for API testing  
- 🐳 Dockerized backend + frontend for easy deployment  

---

## 📘 Domain Model & Rules
**Entity: MediaItem**
| Field | Description |
|-------|--------------|
| **Id** | Primary Key |
| **Title** | Required, unique per user |
| **YearReleased** | Integer, 1888–(current year + 1) |
| **MediaType** | Enum: `Movie`, `TVSeries`, `Anime` |
| **Status** | Enum: `PlanToWatch`, `Watching`, `Watched`, `Dropped` |
| **Rating** | Nullable (1–10), allowed only when Watching/Watched/Dropped |
| **Genres** | Comma-separated string (e.g. `"Action, Drama"`) |

> 🧠 The API returns a `409 Conflict` warning for duplicates unless forced.

---

## 🧱 Architecture Overview

### 🖥 Backend (MediaAPI)
- **Framework:** ASP.NET Core Web API  
- **ORM:** Entity Framework Core  
- **Database:** MSSQL LocalDB → `MediaDB`  
- **Docs & Testing:** Swagger UI  
- **Auth:** JWT authentication via `IAuthService`

### 💅 Frontend (MediaDesign)
- **Framework:** React (Vite)  
- **Styling:** TailwindCSS v4  
- **UI Features:** CRUD UI, inline editing, modals, toasts, filtering, sorting, pagination  
- **Routing:** React Router DOM  
- **API Integration:** Fetch / Axios

### 🐳 Docker Integration
- Each service (backend & frontend) has its own `Dockerfile`
- Combined via **Docker Compose**
- Ensures consistent environment and easy deployment

---

## 📂 Project Structure
```
MediaCollection/
│
├── MediaAPI/              # ASP.NET Core backend
│   ├── Controllers/        # API endpoints (Media, Auth)
│   ├── Services/           # Business logic (SOLID applied)
│   ├── Data/               # EF Core DbContext & migrations
│   ├── Models/             # Entities & DTOs
│   ├── Program.cs          # App startup and DI configuration
│   ├── Dockerfile          # Backend container definition
│   └── appsettings.json    # Connection strings, config
│
├── MediaDesign/            # React frontend
│   ├── src/                # Components, pages, API logic
│   ├── public/             # Static assets
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind setup
│   ├── Dockerfile          # Frontend container definition
│   └── package.json
│
├── docker-compose.yml      # Defines multi-container setup
└── docs/                   # Glossary, Entity design, validation rules
```

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup
```bash
cd MediaAPI
dotnet restore
dotnet ef database update
dotnet run
```
App runs at:  
➡️ `https://localhost:5001` (Swagger UI at `/swagger`)

### 2️⃣ Frontend Setup
```bash
cd MediaDesign
npm install
npm run dev
```
App runs at:  
➡️ `http://localhost:5173`

---

## 🐳 Docker Deployment

### Build and Run All Services
```bash
docker compose up --build
```

### Stop All Containers
```bash
docker compose down
```

### Verify
- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend API: [http://localhost:5000/swagger](http://localhost:5000/swagger)

---

## 🧩 Dockerfile (Backend Example)
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MediaAPI.dll"]
```

## 🧩 Dockerfile (Frontend Example)
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

## 🧩 docker-compose.yml
```yaml
version: "3.9"
services:
  backend:
    build: ./MediaAPI
    ports:
      - "5000:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
    depends_on:
      - sqlserver

  frontend:
    build: ./MediaDesign
    ports:
      - "5173:5173"
    depends_on:
      - backend

  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      SA_PASSWORD: "YourStrong@Passw0rd"
      ACCEPT_EULA: "Y"
    ports:
      - "1433:1433"
```

---

## 🧠 Concepts Highlighted
- **OOP & SOLID Principles** in backend design  
  - Dependency Injection (`IAuthService`, `IMediaItemService`)  
  - Single Responsibility (Controller vs Service separation)  
  - Interface Segregation & Abstraction  
- **LINQ Queries** for filtering and searching media  
- **DTOs** for clean data transfer  
- **Clean separation of concerns** between frontend & backend  

---

## 🧾 Profession copy paster
© 2025 Jaryl Jane Baroro
