# Dockerfile

# Use Node base image
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock for dependency installation
COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install

# Rebuild bcrypt for compatibility with Docker’s Linux environment
RUN yarn add bcrypt --build-from-source

# Copy all application files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Run the app with yarn
CMD ["yarn", "dev"]