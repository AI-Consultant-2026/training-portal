FROM node:20-alpine

# For the personalised ambassador videos (services/ambassadorVideo.service.ts).
RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
