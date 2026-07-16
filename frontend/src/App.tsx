import { Layout } from "./components/Layout"
import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { Dashboard } from "./pages/Dashboard"
import { useState } from "react"
import { Transactions } from "./pages/Transactions"
import { Categories } from "./pages/Categories"

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
    </Layout>
  )
}

export default App
