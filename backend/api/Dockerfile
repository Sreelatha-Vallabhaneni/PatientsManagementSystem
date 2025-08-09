FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the NestJS app
RUN npm run build
#RUN apt-get update && apt-get install -y wait-for-it

#RUN npm install -g @nestjs/cli

EXPOSE 5001

CMD ["npm", "run", "start:prod"]









# # Use official Node.js image
# FROM node:20

# # Set working directory
# WORKDIR /app

# # Copy only package files and install dependencies
# COPY package*.json ./
# RUN npm install

# COPY . .

# # Expose backend port
# EXPOSE 5001

# # Start server
# CMD ["npm", "run", "start:prod"]
