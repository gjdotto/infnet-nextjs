import { gql } from "src/cms/apolloClient";

export const queryPostsSlugs = gql`
  query {
    dataPosts(pagination: { limit: 10000 }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
