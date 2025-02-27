FROM node:16

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    sqlite3

COPY package*.json ./

RUN npm install sqlite3@5.0.2 --build-from-source
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
