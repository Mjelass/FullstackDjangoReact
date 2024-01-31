import 'bootstrap/dist/css/bootstrap.min.css'
import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import NotFound from './components/NotFound'
import './index.css'
import Customer from './pages/Customer'
import Customers from './pages/Customers'
import Definition from './pages/Definition'
import Dictionary from './pages/Dictionary'
import Employees from './pages/Employees'
import Login from './pages/Login'
import Register from './pages/Register'
import { baseURL } from './shared'

export const LoginContext = createContext()

function App() {
  useEffect(() => {
    const refreshTokens = () => {
      if (localStorage.refresh) {
        const url = baseURL + 'api/token/refresh/'
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            localStorage.access = data.access
            localStorage.refresh = data.refresh
            setLoggedIn(true)
          })
      }
    }
    const minute = 1000 * 60
    refreshTokens()
    setInterval(refreshTokens, minute * 3)
  }, [])
  const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false)

  const changeLoggedIn = (value) => {
    setLoggedIn(value)
    if (value === false) {
      localStorage.clear()
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changeLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/:id' element={<Customer />} />
            <Route path='/dictionary' element={<Dictionary />} />
            <Route path='/dictionary/:search' element={<Definition />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App
