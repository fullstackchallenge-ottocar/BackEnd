# Test Driven Development - Node.js API (SQLite, Express, JSON web tokens)
# Technologies used for backend (Development)
- Cross-env runs scripts that set and use environment variables across platforms
- Jest as testing framework since it provides a great testing experience for JavaScript projects
- Knex-cleaner is a helper library to clean a PostgreSQL, MySQL or SQLite3 database tables using Knex. Great for integration tests.
- Nodemon is a tool that helps develop node.js based 
- SuperTest to call our API routes since it provides an easy-to-use API to send HTTP requests in Nodeapplications by automatically restarting the node application when file changes in the directory are detected.
- TypeScript since it greatly improves developer productivity

# Technologies used for backend (Production)
- Bcrypt is a library to help hash passwords.
- Body-parser is a body parsing middleware.
- Cors is used to configure API security and to allow for secure communication between the front-end and back-end servers.
- Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
- Express is a prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. 
- Helmet helps secure Express apps by setting various HTTP headers.
- Jsonwebtoken - we can use JSON web tokens (JWTs) to add authentication to a Web API. JSON web tokens are an industry standard for transferring data between two parties.

    JWTs are cryptographically signed, typically using a secret with the HMACSHA-256 algorithm.

    A JWT is a string that has three parts separated by a period (.). Those are:

    The header.
    The payload.
    The signature.
- Knex is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.
- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- Sqlite3 - SQLite is a software library that provides a relational database management system. The lite in SQLite means light weight in terms of setup, database administration, and required resource.

    SQLite has the following noticeable features: self-contained,serverless, zero-configuration, transactional.


## Endpoints

| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/api/auth/register/`      | `username`, `password`,`email` | Registers a New User to our database. Creates a token.                  |
| POST   | `api//auth/login/`         | `username`, `password`,`email` | Logs a returning user in. Creates a token.                              |
| GET    | `/api/users/`           | Successful Login: uses JWT                | Used to show all user information.                              |
| POST   | `api/cars/`     | Successful Login: uses JWT        | Adds a new car into the database

| PUT    | `/api/cars/:id`| Successful Login: uses JWT | Used to update the specified cars's information in the database.   
| GET    | `/api/cars/carCoun/t`     | Successful Login: uses JWT      | Used to show Total number of cars added     
| GET    | `/api/cars/activeCount/`     | Successful Login: uses JWT      | Used to show Total number of active cars   
| GET    | `/api/cars/inactiveCount/`     | Successful Login: uses JWT      | Used to show Total number of inactive cars   
| DELETE   | `/api/cars/:id`      | Successful Login: uses JWT      | Used to delete a car   
| GET   | `/api/stats/`      | Successful Login: uses JWT      | Used to show active number of HTTP requests sent to the server  
                        
# Sample User
```
"users": {
    "username": "patrick",
    "password": "pass",
    "email": "patrick@gmail.com"
}
```

# Sample Car
```
"cars": {
      "user_id": 1,
      "make": "Tesla",
      "model": "Model 3",
      "year": 2019,
      "active": 1
}
```

# Sample Stats
# Total number of cars added
```
"cars": {        
        "count": 10    
        }
 ```
 
# Total number of active cars 
```
"activeCars": {        
        "count": 8    
        }
 ```
 
# Total number of inactive cars 
```
"inactiveCars": {        
        "count": 2    
        }
```
        
# Active number of HTTP requests sent to the server
```
"http_requests_count": {
        "get_count": 0,
        "post_count": 2,
        "put_count": 2,
        "delete_count": 1
    }
 ```
 
 ### Local Installation
* To locally run this web application, you need a good package manager either npm or yarn. 
I prefer npm as when you install Node.js, npm will install automaically. Here's a great source on how to install node and npm: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm]

* Once you've succesfully installed node and npm, enter this command and it will install all the dependencies required
by the project at once:

```sh
$ npm install
```
* Run app

```sh
$ npm start
```
* You will see the below message in terminal if everything was successfully installed:
** Running on port 4100 **

* Run all automated tests for users, cars and stats helper models
```sh
$ npm test
```
