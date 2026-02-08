# Development stage - supports hot reloading
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code (will be overridden by volume mount in docker-compose)
COPY . .

EXPOSE 3000

ENV PORT=3000

# Run Next.js dev server with hot reloading
CMD ["npm", "run", "dev"]
