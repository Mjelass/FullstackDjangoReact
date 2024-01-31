import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LoginContext } from '../App'
import AddCustomer from '../components/AddCustomer'
import { baseURL } from '../shared'

export default function Customers() {
  const [loggedIn, changeLoggedIn] = useContext(LoginContext)
  const [customers, setCustomers] = useState([])
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  function toggleShow() {
    setShow(!show)
  }

  useEffect(() => {
    const URL = baseURL + 'api/customers/'
    fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          changeLoggedIn(false)
          navigate('/login', {
            state: {
              previousUrl: location.pathname,
            },
          })
        }
        return response.json()
      })
      .then((data) => {
        setCustomers(data.customers)
      })
  }, [])

  function newCustomer(name, industry) {
    const data = {
      // Your data goes here
      name: name,
      industry: industry,
    }
    const url = baseURL + 'api/customers/'
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }
        return response.json()
      })
      .then((data) => {
        toggleShow()
        setCustomers([...customers, data.customer])
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
      <h1>Here are our Customers</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div clas key={customer.id}>
                <Link to={'/customers/' + customer.id}>
                  <button
                    className='btn btn-warning mb-2 
                  
                  '
                  >
                    {customer.name}
                  </button>
                </Link>
              </div>
            )
          })
        : null}
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  )
}
