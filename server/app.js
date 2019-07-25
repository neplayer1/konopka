const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { graphqlUploadExpress } = require('graphql-upload');
const { createWriteStream, existsSync, mkdirSync } = require('fs');

mongoose.connect('mongodb+srv://nepahka:t5cmurcXDyP3JtSKZhSZ5J4q@interiordesign-9ryld.mongodb.net/interiorsDB?retryWrites=true&w=majority', { useNewUrlParser: true });

existsSync(path.join(__dirname, "/images")) || mkdirSync(path.join(__dirname, "/images"));

const app = express();
const PORT = 3005;

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));

app.use('/api',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 }),
  graphqlHTTP({
    schema,
    graphiql: true
  }));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}!`));
dbConnection.once('open', () => console.log(`Connected to DB!`));

app.listen(PORT, err => {
  err ? console.warn(error) : console.log('Server started!');
})