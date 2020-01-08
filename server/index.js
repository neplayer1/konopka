const express = require('express');
const cookieParser = require('cookie-parser');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { graphqlUploadExpress } = require('graphql-upload');
const { existsSync, mkdirSync } = require('fs');
const { ApolloServer } = require('apollo-server-express');

// const connectURI = process.env.MONGODB_URI || 'mongodb://nepahka:t5cmurcXDyP3JtSKZhSZ5J4q@interiordesign-9ryld.mongodb.net/interiorsDB?retryWrites=true&w=majority';
// mongoose.connect(connectURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//       const dbConnection = mongoose.connection;
//       dbConnection.on('error', err => console.log(`Connection error: ${err}!`));
//       dbConnection.once('open', () => console.log(`Connected to DB!`));
//     },
//     err => {
//       console.log('ERROR', err);
//     });

const db = process.env.MONGODB_URL || 'mongodb+srv://nepahka:t5cmurcXDyP3JtSKZhSZ5J4q@interiordesign-9ryld.mongodb.net/interiorsDB?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  const dbConnection = mongoose.connection;
  dbConnection.on('error', err => console.log(`Connection error: ${err}!`));
  dbConnection.once('open', () => console.log(`Connected to DB!`));
});

existsSync(path.join(__dirname, "/images")) || mkdirSync(path.join(__dirname, "/images"));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://pure-hollows-87782.herokuapp.com',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.use('/images',
  express.static(path.join(__dirname, "/images")),
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 20 }),
);

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res })
});
server.applyMiddleware({ app, cors: false });

// app.listen(PORT, err => {
//   err ? console.warn(error) : console.log(`Server started! listening on port ${PORT}`);
// })

app.listen(PORT, function () {
  console.error(`Node listening on port ${PORT}`);
});