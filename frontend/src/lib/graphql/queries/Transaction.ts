import { gql } from "@apollo/client"

export const LIST_TRANSACTIONS = gql`
  query ListTransactions {
    listTransactions {
      id
      amount
      description
      type
      date
      createdAt
      updatedAt
      authorId
      author {
        id
        name
        email
      }
      categoryId
      category {
        id
        title
        description
        icon
        color
        numberOfItems
      }
    }
  }
`