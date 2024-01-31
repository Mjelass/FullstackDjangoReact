import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoginContext } from '../App'
import { baseURL } from '../shared'

export default function Login() {
  const [loggedIn, changeLoggedIn] = useContext(LoginContext)

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const location = useLocation()
  const navigate = useNavigate()

  const login = (e) => {
    e.preventDefault()
    const url = baseURL + 'api/token/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        changeLoggedIn(true)
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        navigate(
          location?.state?.previousUrl
            ? location.state.previousUrl
            : '/customers'
        )
      })
  }
  return (
    <form className='w-full max-w-sm ' id='customer' onSubmit={login}>
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/4'>
          <label for='username'>Username :</label>
        </div>
        <div className='md:w-3/4'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='username'
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
      </div>
      <br />
      <div className='md:flex md:items-center mb-6'>
        <div className='md:w-1/4'>
          <label for='password'>Password :</label>
        </div>
        <div className='md:w-3/4'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
            id='password'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
      </div>
      <button className='btn btn-info'>Login</button>
    </form>
  )
}
