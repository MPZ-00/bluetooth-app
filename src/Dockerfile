# Basisimage
FROM node:14 AS build

# Setzen des Arbeitsverzeichnisses
WORKDIR /app

# Kopieren der package.json- und package-lock.json-Dateien
COPY package*.json ./

# Installieren der Abhängigkeiten
RUN npm install

# Kopieren des restlichen Projektcodes
COPY . .

# Build des Vue.js-Projekts
RUN npm run build

# Finaler Build-Container
FROM nginx:1.21

# Kopieren der Vue.js-Build-Dateien in den NGINX-Container
COPY --from=build /app/dist /usr/share/nginx/html

# Port, auf dem der NGINX-Server lauschen soll
EXPOSE 80

# Starten des NGINX-Servers
CMD ["nginx", "-g", "daemon off;"]