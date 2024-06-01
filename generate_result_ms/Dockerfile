FROM node:20.13.0 as generate_result_ms

WORKDIR /app

VOLUME ["/app/data"]

RUN apt update && apt install -y python3 python3-pip

RUN pip3 install --break-system-packages ortools psutil

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4005

RUN npm run database_init

CMD ["npm", "start"]
