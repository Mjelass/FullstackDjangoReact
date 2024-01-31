import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

function AddEmployee(props) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [img, setImg] = useState('')

  const handleClose = () => {
    setShow(false)
    setName('')
    setImg('')
    setRole('')
  }
  const handleShow = () => setShow(true)

  return (
    <>
      <button onClick={handleShow} class='block mx-auto m-3 btn btn-primary'>
        + Add Employee
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              props.NewEmployee(name, role, img)
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
                  for='role'
                >
                  Role
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='role'
                  type='text'
                  defaultValue={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </div>
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label
                  class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  for='img'
                >
                  Image url
                </label>
              </div>
              <div class='md:w-2/3'>
                <input
                  class='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
                  id='img'
                  type='text'
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </button>
          <button
            form='editmodal'
            className='btn btn-success'
            variant='primary'
            onClick={handleClose}
          >
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEmployee
