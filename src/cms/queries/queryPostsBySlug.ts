import { gql } from "src/cms/apolloClient";

export const queryPostsBySlug = gql`
  query PostsBySlug($slug: String!) {
    dataPosts(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          author
          slug
          content
          publishDate
          photo {
            data {
              attributes {
                url
              }
            }
          }
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
