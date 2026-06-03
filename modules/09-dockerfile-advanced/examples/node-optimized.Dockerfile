FROM node:20-alpine

WORKDIR /app
COPY node-app/package.json /app/package.json
RUN npm install --omit=dev
COPY node-app/index.js /app/index.js

USER node
EXPOSE 3000
CMD ["node", "index.js"]
