# ---------- build stage ----------
FROM node:18-alpine AS build
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source files
COPY . .

# Build the Vite app (output goes to /dist)
RUN npm run build

# ---------- run stage ----------
FROM nginx:alpine AS runtime

# Copy the build output to Nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# Build the image
# docker build -t mediadesign-frontend .

# Run the container
# docker run -p 5173:80 mediadesign-frontend
