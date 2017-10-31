import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from 'react-apollo'
import ReactApollo from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
console.log(createNetworkInterface);

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});

const middleWareInterface = [{
  applyMiddleware(req, next) {
    const headers = req.options.headers || {};
    headers.authorization = token ? `Bearer ${window.token}` : '';
    req.options.headers = headers;
    next();
  }
}];

networkInterface.use(middleWareInterface);
const client = new ApolloClient({ networkInterface });

export default class ApolloApp extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<ApolloApp />, document.getElementById('app'));
