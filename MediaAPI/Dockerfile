# ---------- base runtime ----------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5077
ENV ASPNETCORE_URLS=http://+:5077
ENV ASPNETCORE_ENVIRONMENT=Development

# ---------- build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project file and restore dependencies
COPY MediaAPI.csproj ./
RUN dotnet restore "MediaAPI.csproj"

# Copy everything else
COPY . .

# Publish the app
RUN dotnet publish "MediaAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ---------- final stage ----------
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MediaAPI.dll"]
