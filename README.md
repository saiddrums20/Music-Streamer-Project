# Music-Streamer-Project

This is a back-end project developed with the intention of learning Node.js, Express.js and MongoDB.

It mainly serves as an API for music genres and music tracks.

What i learned:

- General understanding of how node works and its architecture.
- Using node modules, NPM packages and creating/updating custom packages.
- Building RESTful APIs using Express.js.
- Creating middlewares and using built-in/third party ones.
- Working with asynchronous javascript.
- CRUD operations using mongoose/mongodb.
- Mongo data validation.
- Mongoose modelling relationships.
- Authentication and Authorization.
- Handling and logging errors.
- Unit testing.
- Integration testing.
- Test Driven Development (TDD).
- Deployment to Heroku/Mongodb Cloud.

# Usage

This project is currently deployed in Heroku, you can visit:

https://musicstreamerproject.herokuapp.com/api/genres to see the GET functionallity of the genres stored in DB,

https://musicstreamerproject.herokuapp.com/api/tracks to see the GET functionallity of the tracks stored in DB.

To POST/PUT/DELETE a new user needs to be created, the response will give a token for authorization/authentication and only then can edit, add or delete genres/tracks.
