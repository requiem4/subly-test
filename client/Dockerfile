# pull official base image
FROM node:10

# set working directory
WORKDIR /usr/src/client
# add `//usr/src/client/node_modules/.bin` to $PATH
ENV PATH /usr/src/client/node_modules/.bin:$PATH
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
# install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .
EXPOSE 3000
# start app
CMD ["npm", "start"]