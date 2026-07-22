import { Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Transactions } from "./pages/Transactions"
import { Categories } from "./pages/Categories"
import { Profile } from "./pages/Profile"
import { useAuthStore } from "./stores/authStore"
import { RequireAuth, RequireGuest } from "./routes/AuthGuards"

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <Layout>
      <Routes>
        <Route element={ <RequireAuth isAuthenticated={isAuthenticated} /> }>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/transactions" element={ <Transactions /> } />
          <Route path="/categories" element={ <Categories /> } />
          <Route path="/profile" element={ <Profile /> } />
        </Route>

        <Route element={ <RequireGuest isAuthenticated={isAuthenticated} /> }>
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />
        </Route>

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/" : "/login"} replace />
          }
        />
      </Routes>
    </Layout>
  )
}

export default App
