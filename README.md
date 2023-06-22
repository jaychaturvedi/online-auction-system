# Online Auction System

## Setup
-git clone https://github.com/jaychaturvedi/online-auction-system.git
- To run backend:  cd backend && npm i && npm run dev
- To run frontend:  cd frontend && npm i && npm run start

Note: .env file is pushed for ease of running backend

## Contents
Technologies Used
 - Node.js
 - React.js
 - Postgresql, hosted on AWS RDS free tier
 - Typescript


## Backend API
Postman collection for API'S https://documenter.getpostman.com/view/17886387/2s93z5AQUP

- Register User API
- Login User API
- Update User's Balance API
- Get current users profile API
- Place A Bid API
- Create Item
- Get All Items
- Get All Users
- Get User By Id API
- Get All Bids by itemId
- Cron Jobs

Libraries Used : bcrypt, axios, bodyparser, pg, sequelize, jsonwebtoken, moment, cron, typescript, express-validator

## Frontend

Pages & Components: 
- Login Page
- Registration Page
- Home page 
- Create Item page 
- Item Details Page with Bidding Feature
- Wallet Recharge Page
- Item List table
- Popover menu component with Logout, Recharge, Add Item menu
- Navbar Component

Libraries Used: formik, yup, axios, mui/material, lodash, moment, material-icons, react-toastify


