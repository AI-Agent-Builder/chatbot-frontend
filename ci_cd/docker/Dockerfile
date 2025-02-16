ARG IMAGE_DOCKER=node:20.8-alpine
FROM $IMAGE_DOCKER AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat git 
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* ./
RUN yarn install


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
ARG UPLOADTHING_APP_ID
ARG UPLOADTHING_SECRET
ARG UPLOADTHING_URL
ARG DB_URL
ARG NEXT_PUBLIC_API_URL
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

ENV UPLOADTHING_APP_ID=$UPLOADTHING_APP_ID
ENV UPLOADTHING_SECRET=$UPLOADTHING_SECRET
ENV UPLOADTHING_URL=$UPLOADTHING_URL
ENV DB_URL=$DB_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENTRYPOINT ["yarn", "start"]
