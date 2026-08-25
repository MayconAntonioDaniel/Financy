import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
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
      createdAt
      updatedAt
    }
  }
`