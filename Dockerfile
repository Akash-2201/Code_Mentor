# ─── Stage 1: Install dependencies ───
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production + dev dependencies (dev needed for build)
RUN npm ci

# ─── Stage 2: Build the application ───
FROM node:20-alpine AS builder
WORKDIR /app

# Copy deps from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy the Google credentials into the build context
COPY google-credentials.json ./google-credentials.json

# Set env so the build can reference it (non-secret, path only)
ENV GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js standalone output
RUN npm run build

# ─── Stage 3: Production runner ───
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy the standalone output from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Google credentials into the production container
COPY --from=builder /app/google-credentials.json ./google-credentials.json
ENV GOOGLE_APPLICATION_CREDENTIALS="./google-credentials.json"

USER nextjs

EXPOSE 8080

# Start the Next.js standalone server
CMD ["node", "server.js"]
