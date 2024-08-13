FROM node:21
WORKDIR /app/server
COPY package.json ./
RUN npm install
COPY . .
#Copy the env file while making image
COPY .env .env
EXPOSE 5000
CMD [ "npm", "start" ]
