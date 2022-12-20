import { gql } from "src/cms/apolloClient";

export const queryUserInfo = gql`
  query {
    profileInfo {
      data {
        attributes {
          name
          username
          role
          bio
          link
          photo {
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
