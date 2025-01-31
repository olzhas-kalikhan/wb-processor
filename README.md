# WB processor

Aggregates data from wb api to postgres database every 1 hour.
Aggregates data from database to google spreadsheet every day at 00:00

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

## Routes
`/wb-to-db-load` - manual load data from wildberry api to postgres 
`/db-to-gs-load` - manual load data from database to google sheets