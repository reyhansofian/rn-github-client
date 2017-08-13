import ApolloClient, { createNetworkInterface, addTypeName } from 'apollo-client';

export const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql',
});

export const client = new ApolloClient({
  networkInterface,
  queryTransformer: addTypeName,
  dataIdFromObject: o => `${o.__typename}:${o.id}`,
});
