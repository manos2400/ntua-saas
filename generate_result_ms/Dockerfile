FROM node:20.13.0-alpine as generate_result_ms

WORKDIR /app
 
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

CMD ["npm", "start"]