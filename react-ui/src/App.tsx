import React from 'react';
import {Header} from 'contaiters/Header/Header';
import {Footer} from 'contaiters/Footer/Footer';
import {IntlProvider} from 'hoc/hocIntlProvider';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from '@apollo/react-hooks';
import {InMemoryCache} from "apollo-cache-inmemory";
import AppBody from "contaiters/AppBody/AppBody";
import {ModalProvider} from "hoc/hocModalProvider";
import {UploadMultiFilesProvider} from "hoc/hocUploadMultiFiles";
import {UploadSingleFileProvider} from "hoc/hocUploadSingleFile";
import {CookiesProvider} from 'react-cookie';
import {AuthProvider} from "hoc/hocAuthProvider";

const {createUploadLink} = require('apollo-upload-client');

const link = createUploadLink({
  uri: `/graphql`,
  credentials: 'include'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <AuthProvider>
          <IntlProvider>
            <ModalProvider>
              <UploadMultiFilesProvider>
                <UploadSingleFileProvider>
                  <Header/>
                  <AppBody/>
                  <Footer/>
                </UploadSingleFileProvider>
              </UploadMultiFilesProvider>
            </ModalProvider>
          </IntlProvider>
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
};

export default App;
