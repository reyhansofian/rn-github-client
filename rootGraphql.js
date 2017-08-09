import { ApolloClient, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});

export const graphqlClient = new ApolloClient({
  networkInterface,
});
