# 3 In Line Game - Backend

This is a game known in Colombia how "Triki".

## Overview

This is a repo of Backend created in Node.js with TypeScript, mongoose and express.


## setup 

1. The backend needs a database in mongodb. so you have in this repo a folder named **mongoDB**.
    * In its content there is a file `.yml` to run with `docker`.
    * Just excecute next line in a bash when you are inside the folder: `docker-compose up -d` and it will run mongodb.
    * To use the application `Studio 3T` for looking the collections, models and schemas of the information uploaded.


## Runing 

below you find the steps for building and run the Backend of the game and enjoy it.

1. Execute the nvm for changing to node version.

```bash
nvm use
```

2. After install all node packages

```bash
npm i
```

3. for lifting the endpoints to be reachable

```bash
npm run start-dev
```
tweet: https://twitter.com/1992CHRISTIAN13/status/1315870188684926976?s=20