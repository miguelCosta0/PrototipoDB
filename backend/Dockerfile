FROM node:25

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh
RUN chmod +x wait-for-it.sh

ENTRYPOINT [ "./entrypoint.sh" ]