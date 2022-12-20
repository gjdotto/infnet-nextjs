import { gql } from "src/cms/apolloClient";

export const queryUserAvatar = gql`
  query {
    profileInfo {
      data {
        attributes {
          name
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
