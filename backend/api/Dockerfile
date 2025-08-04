# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files (including schema)
COPY ./src ./src

# Generate Prisma client
RUN npx prisma generate --schema=src/prisma/schema.prisma

# Expose backend port
EXPOSE 5001

# Start server
CMD ["npm", "run", "start:prod"]
