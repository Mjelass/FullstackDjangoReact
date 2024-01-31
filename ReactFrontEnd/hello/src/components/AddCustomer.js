import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

function AddCustomer(props) {
  const [show, setShow] = useState(props.show)
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('')

  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <button
        onClick={props.toggleShow}
        class='block mx-auto m-3 btn btn-primary'
      >
        + Add Customer
      </button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setName('')
              setIndustry('')
              props.newCustomer(name, industry)
            }}
            id='editmodal'
            class='w-full max-w-sm'
          >
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label
                  class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  for='name'
                >
                  Name
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='name'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label
                  class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  for='industry'
                >
                  Industry
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='industry'
                  type='text'
                  defaultValue={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            variant='secondary'
            onClick={props.toggleShow}
          >
            Close
          </button>
          <button
            form='editmodal'
            className='btn btn-success'
            variant='primary'
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCustomer
