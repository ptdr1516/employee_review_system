### Employee Review System
## Introduction
This application allows employees to provide feedback on each other's performance. An admin can manage employees, reviews, and assignments while an employee can view the list of reviews they need to provide feedback on and submit feedback.

## Features
#### Admin View:
-Add/remove/update/view employees

-Add/update/view performance reviews

-Assign employees to participate in another employee's performance review

#### Employee View:

-List of performance review requiring feedback

-Submit feedback

-One login for admin and employee

-Employee registration, only admin can make an employee an admin

## Requirements

Node.js

MongoDB

## Folder Structure
The project consists of the following directories:

**models**: contains the MongoDB schemas for employees and reviews

**controllers**: contains the logic for handling HTTP requests

**config**: contains database handler and user authentication strategy 

**routes**: defines the API endpoints

**views**: contains the views for the web pages

**assets**: contains static assets such as images and stylesheets

## Getting Started

### Install the dependencies

`npm install`

### Start the MongoDB server

`mongod`

### Start the Node.js server

`npm start`

Access the application in your browser at `http://localhost:8000`
