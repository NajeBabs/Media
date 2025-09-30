# 🎬 Media Collection API

A simple **full-stack project** to track a single user’s Movies, TV Series, and Anime list.  
Built with **ASP.NET Core Web API**, **Entity Framework Core**, **MSSQL**, and **React + Vite + TailwindCSS**.

Author
Name: Jaryl Jane Baroro
Status: Mini full stack project (for evaluation)
---

## 🚀 Features (Phase 1)
- CRUD operations for media items
- Filter by `status`, `mediaType`, `year`, or `genre`
- Free-text search on title
- Sort by `YearReleased`, `MediaType`, or `Status`
- Pagination support
- Basic validation rules (rating, year, duplicates)

---

## 📘 Domain & Rules
- **MediaItem** = Title, YearReleased, MediaType, Status, Rating, Genres  
- **Rating** allowed only if Status is Watching/Watched/Dropped  
- **Duplicates** allowed, but API warns with `409 Conflict` unless forced  
- See full documentation in [`/docs`](./docs)

---

## 🛠 Tech Stack
- **Backend**: ASP.NET Core Web API, Entity Framework Core, Swagger  
- **Frontend**: React (Vite), TailwindCSS v4  
- **Database**: MSSQL LocalDB (name: `MediaDB`)  

---

## 📂 Project Structure
MediaCollection/
│── MediaAPI/ # ASP.NET Core backend
│ ├── Controllers/ # API controllers
│ ├── Services/ # Business logic, validation
│ ├── Data/ # EF Core context & migrations
│ └── Models/ # Entities, DTOs
│
│── MediaDesign/ # React frontend
│ ├── src/
│ └── public/
│
└── docs/ # Domain docs (Glossary, Entity, Validation, etc.)

---

## ⚙️ Setup Instructions

### Backend
```bash
cd MediaAPI
dotnet restore
dotnet ef database update
dotnet run

### Frontend
cd MediaDesign
npm install
npm run dev
