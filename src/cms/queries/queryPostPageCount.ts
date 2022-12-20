import { gql } from "src/cms/apolloClient";

export const queryPostPageCount = gql`
  query {
    dataPosts(pagination: { pageSize: 9, page: 1 }) {
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;
