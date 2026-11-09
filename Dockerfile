# Portal FactuIO (factuio.app): build standalone de Next servido por Node.
# Las NEXT_PUBLIC_* se fijan en el build; las BREVO_* se pasan en tiempo de ejecución.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_APP_URL=https://factuio.bcntec.dev
ARG NEXT_PUBLIC_SITE_URL=https://factuio.app
ARG NEXT_PUBLIC_BASE_PATH=
ARG NEXT_PUBLIC_FEATURES_LIVE=
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_BASE_PATH=$NEXT_PUBLIC_BASE_PATH NEXT_PUBLIC_FEATURES_LIVE=$NEXT_PUBLIC_FEATURES_LIVE \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
