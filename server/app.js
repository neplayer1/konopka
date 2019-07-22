const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://nepahka:t5cmurcXDyP3JtSKZhSZ5J4q@interiordesign-9ryld.mongodb.net/interiorsDB?retryWrites=true&w=majority', { useNewUrlParser: true });

const app = express();
const PORT = 3005;

app.use(cors());

app.use('/api', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}!`));
dbConnection.once('open', () => console.log(`Connected to DB!`));

app.listen(PORT, err => {
  err ? console.warn(error) : console.log('Server started!');
})