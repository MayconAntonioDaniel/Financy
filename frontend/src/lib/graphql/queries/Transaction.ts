import type { Transaction } from "@/types"
import { gql, type TypedDocumentNode } from "@apollo/client"

export const LIST_TRANSACTIONS: TypedDocumentNode<{ listTransactions: Transaction[] }> = gql`
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