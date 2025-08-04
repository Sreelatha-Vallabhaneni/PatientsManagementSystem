FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src/prisma ./src/prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start:prod"]