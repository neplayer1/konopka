const express = require('express');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');
const token = require('./token');
const cookieParser = require('cookie-parser');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { graphqlUploadExpress } = require('graphql-upload');
const { existsSync, mkdirSync } = require('fs');

mongoose.connect('mongodb+srv://nepahka:t5cmurcXDyP3JtSKZhSZ5J4q@interiordesign-9ryld.mongodb.net/interiorsDB?retryWrites=true&w=majority', { useNewUrlParser: true });

existsSync(path.join(__dirname, "/images")) || mkdirSync(path.join(__dirname, "/images"));

const app = express();
const PORT = 3005;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

const jwtCheck = jwt({
  secret: token.ACCESS_TOKEN_SECRET,
  credentialsRequired: true,
  // getToken: function fromHeaderOrQuerystring (req) {
  //   console.log(req.cookies)
  //   if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
  //     return req.headers.authorization.split(' ')[1];
  //   } else if (req.query && req.query.token) {
  //     return req.query.token;
  //   }
  //   return null;
  // }
  // getToken: function fromHeaderOrQuerystring(req) {
  //   console.log(req)
  //   console.log(req.cookies)
  //   if (req.cookies) {
  //     return req.cookies["access-token"];
  //   }
  //   return null;
  // }
});

// jwtCheck.unless = unless;

// app.use('/api/login', jwtCheck);
app.use('/api',
  express.static(path.join(__dirname, "/images")),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 }),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}!`));
dbConnection.once('open', () => console.log(`Connected to DB!`));

app.listen(PORT, err => {
  err ? console.warn(error) : console.log('Server started!');
})