FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional: install Nest CLI
RUN npm install -g @nestjs/cli

EXPOSE 5001

CMD ["npm", "run", "start:dev"]
