FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3001  
EXPOSE 3001 

CMD ["npm", "run", "start"] 
