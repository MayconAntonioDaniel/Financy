import type { RegisterInput, User } from "@/types"
import { gql, type TypedDocumentNode } from "@apollo/client"

type RegisterMutationData = {
  register: {
    token: string
    refreshToken: string
    user: User
  }
}

type RegisterMutationVars = {
  data: RegisterInput
}

export const REGISTER: TypedDocumentNode<RegisterMutationData, RegisterMutationVars> = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`
