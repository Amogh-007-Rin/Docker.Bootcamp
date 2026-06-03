FROM node:22 AS deps
WORKDIR /app
COPY app/package.json ./
RUN npm install --omit=dev

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/index.js ./
USER node
EXPOSE 3000
CMD ["node", "index.js"]
