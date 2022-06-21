# NestJS JWT-authentication

RestAPI working with JWT-authentication and microservice, which will get new users and count them.
___
## Installation by docker:

in /server only

> docker-compose pull

> docker-compose up -d

___

## Installation by package.json commands:

first of all: change DB_HOST to localhost in /development.env

in both folders:
> npm install

or for current versions: 
> npm ci 
___
in /microservice
> npm run start:microservice

in /server
> npm run start:dev

___

## Endpoints
GET: 

http://localhost:2020/auth/authentication 
http://localhost:2020/auth/refresh-token

POST: 

http://localhost:2020/auth/registration
http://localhost:2020/auth/login
http://localhost:2020/auth/logout

PUT:

http://localhost:2020/users/password-recover
http://localhost:2020/users/data-updating

DELETE: 

http://localhost:2020/users/account-deleting


___

## Stack: Node.js, NestJS, PostgresQL, Docker