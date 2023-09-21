FROM node:18-alpine

RUN mkdir -p /app/src
WORKDIR /app


COPY package*.json /app/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production


COPY . .

EXPOSE 1340
CMD [ "npm", "start" ]
