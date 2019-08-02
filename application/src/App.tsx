import React from 'react';
import {Header} from 'contaiters/Header/Header';
import {Footer} from 'contaiters/Footer/Footer';
import {IntlProvider} from 'hoc/hocIntlProvider';
import ApolloClient from 'apollo-client';
import ApolloProvider from "react-apollo/ApolloProvider";
import {InMemoryCache} from "apollo-cache-inmemory";
import AppBody from "contaiters/AppBody/AppBody";

const {createUploadLink} = require('apollo-upload-client')

const link = createUploadLink({
  uri: `http://localhost:3005/api`,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <IntlProvider>
        <Header/>
        <AppBody/>
        <Footer/>
      </IntlProvider>
    </ApolloProvider>
  );
};

export default App;
