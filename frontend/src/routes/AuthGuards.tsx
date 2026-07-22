import { Navigate, Outlet } from "react-router-dom"

type GuardProps = {
  isAuthenticated: boolean
}

export function RequireAuth({ isAuthenticated }: GuardProps) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function RequireGuest({ isAuthenticated }: GuardProps) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
