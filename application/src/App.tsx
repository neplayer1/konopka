import React from 'react';
import {Header} from 'contaiters/Header/Header';
import {Footer} from 'contaiters/Footer/Footer';
import {Body} from 'contaiters/Body/Body';
import {IntlProvider} from 'hoc/hocIntlProvider';
import ApolloClient from 'apollo-boost';
import ApolloProvider from "react-apollo/ApolloProvider";

const client = new ApolloClient({
    uri: `http://localhost:3005/api`
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <IntlProvider>
                <div className="wrapper">
                    <Header/>
                    <Body/>
                    <Footer/>
                </div>
            </IntlProvider>
        </ApolloProvider>
    );
}

export default App;
