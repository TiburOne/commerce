# Usa una imagen base de Node.js con Alpine Linux
FROM node:20.13.1-alpine

# Instala las dependencias necesarias para Puppeteer y Chromium
RUN apk update && apk upgrade && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    npm

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Copiar el archivo .env al contenedor
COPY .env .env

# Establecer la variable de entorno para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3000

# Define las variables de entorno necesarias para la base de datos (puedes ajustar según tus necesidades)
ENV NODE_ENV=production

# Ejecuta el comando para iniciar la aplicación
CMD ["node", "index.mjs"]
