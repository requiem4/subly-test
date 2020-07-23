# This official base image contains node.js and npm
FROM node:10
ARG VERSION=1.0.0
# Copy the application files

WORKDIR /usr/src/server
# add `//usr/src/client/node_modules/.bin` to $PATH
ENV PATH /usr/src/client/node_modules/.bin:$PATH
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin

COPY package*.json ./
RUN npm install --silent

COPY . .
EXPOSE 4001
# Make the application run when running the container
#CMD ["npm", "start"]