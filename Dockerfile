FROM node:alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json ./app

COPY . .

RUN npm install 
RUN npm run build

CMD ["npm", "run", "start"]