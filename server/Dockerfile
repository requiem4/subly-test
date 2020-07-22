# This official base image contains node.js and npm
FROM node:13.12.0-alpine
ARG VERSION=1.0.0
# Copy the application files
WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 4001
# Make the application run when running the container
CMD ["node", "app.ts"]