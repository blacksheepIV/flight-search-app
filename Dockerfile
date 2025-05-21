# --- 1. Install dependencies --- 
FROM node:20.19.0-alpine AS deps 
WORKDIR /app  

RUN apk add --no-cache libc6-compat  

# Copy just enough to install dependencies
COPY package.json yarn.lock* ./ 

# Install dependencies with Yarn
RUN yarn install --frozen-lockfile

# --- 2. Build with Drizzle and Next.js --- 
FROM node:20.19.0-alpine AS builder 
WORKDIR /app  


# Copy node modules and the rest of the code
COPY --from=deps /app/node_modules ./node_modules
COPY . .  

# Copy the correct env file 
# Default to .env.local for non-production 
ARG NODE_ENV=production 
ENV NODE_ENV=$NODE_ENV    

# Generate Drizzle client (needs DB_URL from env) 
RUN yarn drizzle-kit generate  

# Build Next.js app 
RUN yarn build  

# --- 3. Final production image --- 
FROM node:20.19.0-alpine AS runner 
WORKDIR /app  

ENV NODE_ENV=production  



# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/db/migrations ./src/db/migrations

# Switch to non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000 

# Use yarn to start the application
CMD ["yarn", "start"]