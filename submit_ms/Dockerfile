FROM node:20.13.0-alpine as submit_ms

WORKDIR /app
 
COPY package*.json ./

RUN npm install

COPY . .

RUN mkdir -p /app/uploads

EXPOSE 4001

CMD ["npm", "start"]