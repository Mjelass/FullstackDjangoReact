import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

function EditEmployee(props) {
  const [show, setShow] = useState(false)
  const [name, setName] = useState(props.name)
  const [role, setRole] = useState(props.role)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <button
        onClick={handleShow}
        class='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
      >
        Update
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log(props.id, name, role)
              props.updateEmployee(props.id, name, role)
            }}
            id='editmodal'
            className='w-full max-w-sm'
          >
            <div class='md:flex md:items-center mb-6'>
              <div class='md:w-1/3'>
                <label
                  class='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
                  for='inline-full-name'
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
                  for='inline-full-name'
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
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditEmployee
