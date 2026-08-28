import type { Category } from "@/types"
import { gql, type TypedDocumentNode } from "@apollo/client"

export const LIST_CATEGORIES:TypedDocumentNode<{ listCategories: Category[] }> = gql`
  query ListCategories {
    listCategories {
      id
      title
      description
      icon
      color
      numberOfItems
      authorId
      author {
        id
        name
        email
      }
      transactions {
        id
        categoryId
        description
        amount
        type
        date
        authorId
        author {
          id
          name
          email
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
