# Basisimage
FROM node:14

# Setzen des Arbeitsverzeichnisses
WORKDIR /src

# Kopieren der package.json- und package-lock.json-Dateien
COPY package*.json ./

# Installieren der Abhängigkeiten
RUN npm install

# Kopieren des restlichen Projektcodes
COPY . .

# Build des Vue.js-Projekts
RUN npm run build

EXPOSE 8080

# Ausführen des Vue.js-Servers
CMD ["npm", "run", "serve"]