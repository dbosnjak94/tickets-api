#Ticket API for Clients and Vendors - REST API

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
REST API that serves users who want to buy tickets, cancel them and see the list of their purchased tickets.</br>
Also it provides vendors the possibility to create, edit and delete tickets. Everything is stored and tracked</br>
in the database.

## Technologies
Project is created with:
* Node.js (Typescript)
* MySQL

NPM libraries used un the project:

Server-side:
* bcrypt: 5.0.1
* cors: 2.8.5
* dotenv: 10.0.0
* express: 4.17.2
* jsonwebtoken:8.5.1
* morgan: 1.10.0
* mysql2: 2.3.3
* npm-run-all: 4.1.5
* rimraf: 3.0.2
* swagger-ui-express: 4.3.0

## Setup
To run this project, MySQL database needs to be created from MySQL script</br>
which can be found in folder tickets-api/sql-script.


###Before you can start the project, you need to create .env in /tickets-api folder and fill it with necessary data:</br>
.env template:</br>
PORT=3001</br>
DB_HOST= *your database local host*</br>
DB_PORT=*your database local port*</br>
DB_USER=*your databse local user*</br>
DB_PASSWORD=*your databse local password*</br>
DB_DATABASE=ticket_manager</br>
DB_SALT_ROUNDS=10

###Starting server-side
```
$ cd server
$ npm install
$ npm run start
```

###Authorization
All users have identical password: "Password1"</br>
To get authorization for a user, you can register your own, or use:</br>
mail: dominik.bosnjak94@gmail.com </br>
password: Password1 </br>


###Swagger-UI
To visit Swagger endpoint documentation visit:  http://localhost:3001/api/api-docs#

###Postman collection
You are also provided with postman collection in folder tickets-api/postman

