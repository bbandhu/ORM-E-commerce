# E-commerce Back End
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## Description
  
  This is the back end for an e-commerce website, built using Express.js and Sequelize to interact with a MySQL database. It includes four models (Category, Product, Tag, and ProductTag) with defined associations, and RESTful routes for CRUD operations on each model.

  ## Table of Contents
   
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Features](#features)
  - [Tests](#tests)

  ## Installation

Clone this repository to your local machine.
Run npm install to install the necessary dependencies.
Create a .env file and add your MySQL username, password, and database name, like this:
makefile
Copy code
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
Create the database by running mysql -u root -p to open the MySQL shell, then entering source db/schema.sql to create the database.
Seed the database by running npm run seed.
Start the application by running npm start.

  ## Usage

You can use a tool like Insomnia/Postman Core to test the API routes. Here are some examples of the available routes:
* GET /api/categories - get all categories
* GET /api/categories/:id - get one category by id
* POST /api/categories - create a new category
* PUT /api/categories/:id - update a category by id
* DELETE /api/categories/:id - delete a category by id
* GET /api/products - get all products
* GET /api/products/:id - get one product by id
* POST /api/products - create a new product
* PUT /api/products/:id - update a product by id
* DELETE /api/products/:id - delete a product by id
* GET /api/tags - get all tags
* GET /api/tags/:id - get one tag by id
* POST /api/tags - create a new tag
* PUT /api/tags/:id - update a tag by id
* DELETE /api/tags/:id - delete a tag by id

  ## Credits
  Tutor

  ## License 
    this project is licensed under MIT License

  ##Features

  It includes four models (Category, Product, Tag, and ProductTag) with defined associations, and RESTful routes for CRUD operations on each model.
   
 #Tests Coverage

  N/A




