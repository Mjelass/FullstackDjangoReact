import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import AddEmployee from '../components/AddEmployee'
import EditEmployee from '../components/EditEmployee'
import Employee from '../components/Employee'
import Header from '../components/Header'
import '../index.css'

function Employees(props) {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Caleb',
      role: 'intern',
      img: 'https://images.pexels.com/photos/14024358/pexels-photo-14024358.jpeg',
    },
    {
      id: 2,
      name: 'Ajoum',
      role: 'CEO',
      img: 'https://images.pexels.com/photos/14024358/pexels-photo-14024358.jpeg',
    },
    {
      id: 3,
      name: 'Swirra',
      role: 'CTO',
      img: 'https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 4,
      name: 'Aymen',
      role: 'Buisness manager',
      img: 'https://images.pexels.com/photos/997489/pexels-photo-997489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 5,
      name: 'Emna',
      role: 'international relation',
      img: 'https://images.pexels.com/photos/2535859/pexels-photo-2535859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 6,
      name: 'Nabila',
      role: 'teacher',
      img: 'https://images.pexels.com/photos/2423517/pexels-photo-2423517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ])

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole }
      }
      return employee
    })
    setEmployees(updatedEmployees)
  }

  function NewEmployee(name, role, img) {
    setEmployees([
      ...employees,
      {
        id: uuidv4(),
        name: name,
        role: role,
        img: img,
      },
    ])
  }

  const showEmployees = true
  return (
    <div className=''>
      
      {showEmployees ? (
        <div>
          <div className='flex flex-wrap justify-center'>
            {employees.map((employee) => {
              const editEmployee = (
                <EditEmployee
                  name={employee.name}
                  role={employee.role}
                  updateEmployee={updateEmployee}
                  id={employee.id}
                />
              )
              return (
                <Employee
                  key={employee.id}
                  id={employee.id}
                  name={employee.name}
                  role={employee.role}
                  img={employee.img}
                  editEmployee={editEmployee}
                />
              )
            })}
          </div>
          <AddEmployee NewEmployee={NewEmployee} />
        </div>
      ) : (
        <p>You can not see the employees</p>
      )}
    </div>
  )
}

export default Employees
