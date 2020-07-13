# This official base image contains node.js and npm
FROM node:10
ARG VERSION=1.0.0
# Copy the application files
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
# Make the application run when running the container
CMD ["node", "app.ts"]