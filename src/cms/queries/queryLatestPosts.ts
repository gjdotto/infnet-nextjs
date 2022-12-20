import { gql } from "src/cms/apolloClient";

export const queryLatestPosts = gql`
  query {
    dataPosts(sort: ["updatedAt"], pagination: { limit: 6 }) {
      data {
        attributes {
          title
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
