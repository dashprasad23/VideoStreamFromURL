FROM  node:18.12.1-alpine

WORKDIR /app

COPY package.json .

RUN npm i -g nodemon

RUN npm i

COPY . .


EXPOSE 443 3000

CMD ["npm", "run", "start:prod"]