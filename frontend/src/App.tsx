import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { Transactions } from "./pages/Transactions"
import { Categories } from "./pages/Categories"
import { Profile } from "./pages/Profile"

function App() {
  const [auth, setAuth] = useState(true)

  return (
    <Layout>
      {auth ? (
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={ <Login /> } />
        </Routes>
      )}
      <Routes>
        <Route path="/signup" element={ <Signup /> } />
      </Routes>
      <Routes>
        <Route path="/transactions" element={ <Transactions /> } />
      </Routes>
      <Routes>
        <Route path="/categories" element={ <Categories /> } />
      </Routes>
      <Routes>
        <Route path="/profile" element={ <Profile /> } />
      </Routes>
    </Layout>
  )
}

export default App
