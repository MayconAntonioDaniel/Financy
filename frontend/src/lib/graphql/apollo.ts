import { useAuthStore } from "@/stores/authStore"
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { SetContextLink } from "@apollo/client/link/context"
import { ErrorLink } from "@apollo/client/link/error"
import { CombinedGraphQLErrors } from "@apollo/client/errors"

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
})

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const errorLink = new ErrorLink(({ error }) => {
  const authMessages = [
    "Usuário não autenticado",
    "UNAUTHENTICATED",
    "jwt expired",
    "Unauthorized",
  ]

  let hasAuthGraphQLError = false
  let hasAuthNetworkError = false

  if (CombinedGraphQLErrors.is(error)) {
    hasAuthGraphQLError = error.errors.some((err) =>
      authMessages.some((msg) =>
        err.message.toLowerCase().includes(msg.toLowerCase()),
      ),
    )
  } else {
    const maybeStatusCode = (error as { statusCode?: number }).statusCode
    hasAuthNetworkError = Number(maybeStatusCode) === 401
  }

  if (hasAuthGraphQLError || hasAuthNetworkError) {
    useAuthStore.getState().logout("expired")

    if (window.location.pathname !== "/login") {
      window.location.replace("/login")
    }
  }
})

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
