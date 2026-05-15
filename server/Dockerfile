# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5000
# CMD ["npm", "run", "dev"]

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 8080
# CMD ["node", "start"]
CMD ["node", "src/index.js"]