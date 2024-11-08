# APDS7311 Final POE


## Table of Contents

- [Application Description](#application-description)
- [Team Members](#team-members)
- [Tech Stack/Framework Used](#tech-stack-used) 
- [Prerequisites](#prerequisites)
- [Features](#features)
- [Packages Used In Backend](#packages-used-in-backend)
- [Bcrypt.js](#bcrypt.js)
- [Cookie parser](#cookie-parser)
- [Crypto](#crypto)
- [Csurf](#csurf)
- [Dotenv](#dotenv)
- [Express Session](#express-session)
- [Express Validator](#express-validator)
- [Express](#express)
- [Helmet](#helmet)
- [Mongoose](#moongoose)
- [YoutubeLink Demostration Link](#youtubeLink-Demostration-Link)
- [Authors](#authors)
- [References](#references)


## Application Description
> [!NOTE]
> Description of the application that users should know.

This application is an internal international payment system developed for a major international bank. It consists of a customer-facing portal for initiating international payments and an employee portal for verifying and processing these payments.


## Team Members

- Shayden Munian
- Sachin Mahabeer
- Ayush Sirkisson
- Shivaan Heralall
- Malekah Luther


## Tech Stack Used
> [!NOTE]
> Useful information that users should know.

**Built with** :

- Frontend: React
- Backend: Node.js with Express
- Database: MongoDB
- API: JWT Authentication
- Swift.ja
- Swift 6
- jsonwebtoken@9.0


## Prerequisites
> [!IMPORTANT]
> Key information users need to know to run the application.

Before you begin, ensure you have met the following requirements:

- **Install The Latest Version of Visual Studio Code** 

- **Have Git installed if you are forking the repository**

- **Install OpenSSL**

- **Node.js**


## Features
> [!IMPORTANT]
> Key features of the application.

**Customer Portal** :

- User registration and authentication
- Secure login system
- Users can input banking details
- Payment confirmation

## Packages Used In Backend
> [!IMPORTANT]
> Packages used to build the application.

- bcryptjs@2.4.3
- cookie-parser@1.4.6
- crypto@1.0.1
- csurf@1.10.0
- dotenv@16.4.5
- express-session@1.18.0
- express-validator@7.2.0
- express@4.21.0
- helmet@8.0.0
- mongoose@8.7.0


## Bcrypt.js
> [!NOTE]
> Information on Bcrypt.js.

Bcrypt.js is an useful Node.js package for password hashing. It uses the bcrypt password hashing technique, which is regarded as a safe and industry-standard approach for storing passwords in a database (Khaled, 2024).


## Cookie parser
> [!NOTE]
> Information on Cookie-parser.

Cookie-parser is middleware that makes it easier to handle cookies. It parses incoming cookies from client requests and stores them in the request.cookies object. This allows you to read and manipulate cookies in your Express JS application without having to parse them manually (geeksforgeeks, 2024).


## Crypto
> [!NOTE]
> Information on Crypto.

Crypto is a Node.js module that implements an algorithm for data encryption and decryption. This is used for security purposes, such as user authentication, by keeping the password in encrypted form in a database (Pabbly, 2024).


## Csurf
> [!NOTE]
> Information on Csurf.

Csurf middleware in Node.js protects against Cross-Site Request Forgery (CSRF) attacks on an application. When a browser loads a page from the server, this module delivers a randomly generated string as a CSRF token. As a result, the POST request will deliver the random CSRF token as a cookie. Because tokens are produced at random, the one delivered for each request will be unique (geeksforgeeks, 2024).


## Dotenv
> [!NOTE]
> Information on Dotenv.

Dotenv is a zero-dependency module that imports environment variables from a.env file into process.env. The Twelve-Factor App technique dictates that configuration be stored separately from code within the environment (Npm, 2024).


## Express Session
> [!NOTE]
> Information on Express Session.

The express-session module allows you to manage sessions in node.js. It aids in storing data in the key-value format. This module just saves the session ID in the cookie, not the session data (geeksforgeeks, 2024).


## Express Validator
> [!NOTE]
> Information on Express Validator.

Express-Validator is a middleware package that combines the Express JS module with the Validator.js module, which includes validators and sanitizers for string data types. Express-Validator offers the ability to validate input data via a validation chain (Singh, 2024).


## Express
> [!NOTE]
> Information on Express.

Express is a Node.js web application framework that offers a wide range of functionality for developing online and mobile apps. It is used to create single, multipage, and hybrid web applications. It's a layer that sits on top of Node.js and helps manage servers and routes (Sharma, 2024).


## Helmet
> [!NOTE]
> Information on Helmet.

Helmet is a group of Node.js middleware modules that safeguard web applications by setting critical HTTP headers. These headers are critical in preventing common online vulnerabilities such as Cross-Site Scripting (XSS), Clickjacking, and Cross-Site Request Forgery (CSRF). Helmet serves as your application's protective armour, delivering critical levels of protection without the need for complicated setups (Jacob, 2023).


## Mongoose
> [!NOTE]
> Information on Mongoose.

Mongoose is an ODM library for MongoDB and Node.js. It handles data associations, does schema validation, and bridges the gap between coded objects and their MongoDB representations (freeCodeCamp, 2018).


## YoutubeLink Demostration Link

https://youtu.be/xL7zLtn2lz0

## Authors

```
st10209473@vcconnect.edu.za
```
``` 
st10222881@vcconnect.edu.za
```
```  
st10053116@vcconnect.edu.za
```
```
st10175551@vcconnect.edu.za
```
```  
st10142592@vcconnect.edu.za
```


## References

- Khaled, A. (2024) Node.js bcrypt.js: A password Hashing Library, Medium. Available at: https://medium.com/@amirakhaled2027/node-js-bcrypt-js-a-password-hashing-library-c9f3270ca024#:~:text=js%20is%20a%20popular%20Node,storing%20passwords%20in%20a%20database. (Accessed: 08 October 2024).

- GeeksforGeeks (2024) What is the purpose of the cookie-parser middleware in express.js?, GeeksforGeeks. Available at: https://www.geeksforgeeks.org/what-is-the-purpose-of-the-cookie-parser-middleware-in-express-js/ (Accessed: 08 October 2024).

- Pabbly (2024) Crypto in Node.js, Pabbly. Available at: https://www.pabbly.com/tutorials/crypto-in-node-js/ (Accessed: 08 October 2024).

- GeeksforGeeks (2024) Implementing CSURF middleware in Node.js, GeeksforGeeks. Available at: https://www.geeksforgeeks.org/implementing-csurf-middleware-in-node-js/ (Accessed: 08 October 2024).

- Npm (2024) Dotenv, npm. Available at: https://www.npmjs.com/package/dotenv (Accessed: 08 October 2024).

- GeeksforGeeks (2024) What is express-session middleware in express?, GeeksforGeeks. Available at: https://www.geeksforgeeks.org/what-is-express-session-middleware-in-express/#:~:text=Session%20management%20can%20be%20done,link%20Install%20express%2Dsession%20module. (Accessed: 08 October 2024).

- Singh, C. (2024) How to handle form inputs efficiently with express-validator in expressjs, DigitalOcean. Available at: https://www.digitalocean.com/community/tutorials/how-to-handle-form-inputs-efficiently-with-express-validator-in-express-js (Accessed: 08 October 2024).

- Sharma, A. (2024) Express JS tutorial [understand in 5 minutes], Simplilearn.com. Available at: https://www.simplilearn.com/tutorials/nodejs-tutorial/what-is-express-js#:~:text=StackExplore%20Program-,What%20Is%20Express%20JS%3F,helps%20manage%20servers%20and%20routes. (Accessed: 08 October 2024).

- Jacob, S. (2023) Securing your node.js application security with Helmet, Medium. Available at: https://medium.com/@selieshjksofficial/securing-your-node-js-application-security-with-helmet-296377385d07 (Accessed: 04 October 2024).

- freeCodeCamp (2018) Introduction to mongoose for mongodb, freeCodeCamp.org. Available at: https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/ (Accessed: 08 October 2024). 
