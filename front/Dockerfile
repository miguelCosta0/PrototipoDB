FROM node:25

WORKDIR /app

COPY package* .

RUN npm install

EXPOSE 5050

COPY . .

RUN npm run build

CMD [ "npm", "start"]