FROM node:21
WORKDIR /app/server
COPY package.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 5000
CMD [ "npm", "start" ]
