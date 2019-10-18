<h1 align="center">Robinhood - The Food Banking Solution<h1>

https://limitless-bayou-30453.herokuapp.com/

## Table of Contents
- [Functionalities](#functionalities)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Setting up Development Environment](#setting-up-dev)
    - [Guest Login](#guest-login)


## Functionalities
[^top](#table-of-contents)
Robinhood - The Food Banking Solution is conceived as a market place application with the goal of reducing food wastage in canada and helping the needy.
See details [here](https://docs.google.com/presentation/d/1d0PaSPEma_IvDEyWf1BqwvO4V6KQUAP8s9c3zTwznUI/edit#slide=id.g25f6af9dd6_0_0) and [here](https://docs.google.com/document/d/1qiPuIMSbRDIKME2O2p943VMcx8lfbg7kezr6QB0kIJw/edit)

<br>

## Tech Stack

 - ### Front End
    <img src="./public/img/html.png" width="100" height="100"> 
    <img src="./public/img/css.png" width="100" height="100">
    <img src="./public/img/jquery.png" width="100" height="100"> 
    <img src="./public/img/bootstrap.png" width="100" height="100">

- ### Server Side
    <img src="./public/img/npm.png" width="200" height="100"> 
    <img src="./public/img/moemnt.png" width="100" height="100"> 
    <img src="./public/img/twilio.png" width="200" height="100"> 
    <img src="./public/img/handlebars_logo.png" width="150" height="100"> 
    <img src="./public/img/express.png" width="200" height="100"> 

- ### Database
    <img src="./public/img/sequelize.png" width="200" height="100"> 
    <img src="./public/img/mysql.png" width="200" height="100"> 


## Getting Started

- ### Setting up Development Environment
    1. Use [config.json](./config/config.json) to set up the development, test and production database connections
    2. Register for a account in [Twilio](https://www.twilio.com) and obtain auth token and account sid
    3. ENV variables:
        - NODE_DEV : development/test
        - SYNC_MODEL: true (sequelize will force sync the model) , false (sequelize will not force sync the model)
        - TWILIO_ACCOUNTSID & TWILIO_AUTHTOKEN 
    4. If tables are wiped clean due to syncing of models, use [seeds.sql](./models/seeds.sql) to populate test data

- ### Guest Login Details
    ### Login as Supplier
        - User Id: Walmart
        - Password: abcd
    ### Login as Customer
        - User Id: Alex
        - Password: abcd

