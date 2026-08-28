import { gql } from "@apollo/client"

export const UPDATE_ME = gql`
  mutation UpdateMe($data: UpdateUserInput!) {
    updateMe(data: $data) {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`