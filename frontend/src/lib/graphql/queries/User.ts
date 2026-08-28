import type { User } from "@/types";
import { gql, type TypedDocumentNode } from "@apollo/client";

export const GET_ME: TypedDocumentNode<{ getMe: User }> = gql`
  query GetMe{
    getMe{
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`