FROM node:22

WORKDIR /wb-processor
COPY package.json .
RUN npm install
COPY . .
# RUN npm run prod:migrate:latest
RUN npm run build
RUN git clone https://github.com/vishnubob/wait-for-it.git