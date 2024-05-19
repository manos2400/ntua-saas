FROM node:20.13.0-alpine as generate_result_ms

WORKDIR /app

VOLUME [ "/app/data" ]

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

RUN npm run database_init

CMD ["npm", "start"]