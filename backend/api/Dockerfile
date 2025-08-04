# base image
FROM node:20

# set working directory
WORKDIR /app

# copy package files and install
COPY package*.json ./
RUN npm install

# copy source code, including prisma
COPY ./src ./src

# run prisma generate
RUN npx prisma generate --schema=src/prisma/schema.prisma

# expose port
EXPOSE 5001

# start app
CMD ["npm", "run", "start:prod"]
