# Use Node.js LTS image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 4000

# Run migrations and start app
CMD ["sh", "-c", "npx sequelize db:migrate && node src/index.js"]
