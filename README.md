# WB processor
## How to start

Prerequisite: 
- postgres
- docker
- node

Local Start:
1. `npm install` - install packages
2. `npm run dev:migrate:latest` - apply db migrations
3. `npm run dev` - start server

Prod: 
1. `npm install` - install packages
2. `npm build` - build app
3. `npm run prod:migrate:latest` - apply db migrations
4. `npm run prod` - start server

Docker:
`docker compose up --build`