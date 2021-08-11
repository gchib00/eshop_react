import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ApolloClient, InMemoryCache} from "@apollo/client"


// eslint-disable-next-line no-unused-vars
const client = new ApolloClient({
  uri: 'https://radiant-inlet-15571.herokuapp.com/',
  cache: new InMemoryCache(),
  introspection: true,
  playground: true
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)