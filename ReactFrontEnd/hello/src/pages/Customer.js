import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from '../App'
import NotFound from '../components/NotFound'
import { baseURL } from '../shared'

export default function Customer() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)
  const { id } = useParams()
  const [customer, setCustomer] = useState()
  const [tempCustomer, setTempCustomer] = useState()
  const [notFound, setNotFound] = useState(false)
  const [changed, setChanged] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const URL = baseURL + 'api/customers/' + id
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true)
        } else if (response.status === 401) {
          setLoggedIn(false)

          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          })
        }
        if (!response.ok) {
          console.log('response', response)
          throw new Error('Something went wrong, try again later')
        }

        return response.json()
      })
      .then((data) => {
        setCustomer(data.customer)
        setTempCustomer(data.customer)
        setError(undefined)
      })
      .catch((e) => {
        setError(e.message)
      })
  }, [])

  const updateCustomer = (e) => {
    e.preventDefault()
    const url = baseURL + 'api/customers/' + id
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (response.status === 401) {
          setLoggedIn(false)

          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          })
        }
        if (!response.ok) throw new Error('something went wrong')
        return response.json()
      })
      .then((data) => {
        setCustomer(data.customer)
        setChanged(false)
        setError(undefined)
      })
      .catch((e) => {
        console.log('e', e)
        setError(e.message)
      })
  }

  useEffect(() => {
    if (!customer) return
    if (!tempCustomer) return
    let equal = true
    if (customer.name !== tempCustomer.name) equal = false

    if (customer.industry !== tempCustomer.industry) equal = false

    if (equal) setChanged(false)
  })

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <div className='p-3'>
          <h1 className='mb-2'>Here is the customer : </h1>
          <form
            className='w-full max-w-sm '
            id='customer'
            onSubmit={updateCustomer}
          >
            <div className='md:flex md:items-center mb-6'>
              <div className='md:w-1/4'>
                <label for='name'>Name :</label>
              </div>
              <div className='md:w-3/4'>
                <input
                  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='name'
                  type='text'
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setChanged(true)
                    setTempCustomer({ ...tempCustomer, name: e.target.value })
                  }}
                />
              </div>
            </div>
            <br />
            <div className='md:flex md:items-center mb-6'>
              <div className='md:w-1/4'>
                <label for='industry'>Industry :</label>
              </div>
              <div className='md:w-3/4'>
                <input
                  className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='industry'
                  type='text'
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setChanged(true)
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    })
                  }}
                />
              </div>
            </div>
          </form>
          <br />
          {changed ? (
            <>
              <button className='btn btn-warning mr-2 mt-2' form='customer'>
                Save
              </button>

              <button
                className='btn btn-dark mr-2 mt-2'
                onClick={(e) => {
                  setTempCustomer({ ...customer })
                  setChanged(false)
                }}
              >
                Cancel
              </button>
            </>
          ) : null}

          <button
            className='btn btn-danger mr-2 mt-2'
            onClick={() => {
              const url = baseURL + 'api/customers/' + id
              fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + localStorage.getItem('access'),
                },
              })
                .then((response) => {
                  if (response.status === 401) {
                    navigate('/login', {
                      state: {
                        previousUrl: location.pathname,
                      },
                    })
                  }
                  if (!response.ok) {
                    throw new Error('Something went wrong')
                  }
                  navigate('/customers')
                })
                .catch((e) => {
                  setError(e.message)
                })
            }}
          >
            Delete
          </button>
          <Link className='btn btn-info mt-2' to='/customers'>
            Go back
          </Link>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
    </>
  )
}
