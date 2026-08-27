import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($categoryId: String!, $data: CreateTransactionInput!) {
    createTransaction(categoryId: $categoryId, data: $data) {
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

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: String!, $data: UpdateTransactionInput!) {
    updateTransaction(id: $id, data: $data) {
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`