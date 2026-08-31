import type { LoginInput, User } from "@/types"
import { gql, type TypedDocumentNode } from "@apollo/client"

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

type LoginMutationVars = {
  data: LoginInput
}

export const LOGIN: TypedDocumentNode<LoginMutationData, LoginMutationVars> = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      refreshToken
      user {
        id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`