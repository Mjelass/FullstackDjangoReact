import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DefinitionSearch from '../components/DefinitionSearch'
import NotFound from '../components/NotFound'

export default function Definition() {
  const [word, setWord] = useState([])
  const [notFound, setnotFound] = useState(false)
  let { search } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + search)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setWord(data[0].meanings)
      })
      .catch((error) => {
        setnotFound(true)
      })
  }, [])

  if (notFound) {
    return (
      <>
        <NotFound></NotFound>
        <br />
        <Link to='/dictionary'>RETURN</Link>
      </>
    )
  }

  return (
    <>
      {word ? (
        <>
          {word.map((meaning, index) => (
            <p key={index}>{meaning.definitions[0].definition}</p>
          ))}
          <p1>Search again : </p1>
          <DefinitionSearch />
          <button
            onClick={() => {
              navigate('/dictionary/')
            }}
            className='btn btn-secondary mt-2'
          >
            Return
          </button>
        </>
      ) : (
        <p1>LOADING.....</p1>
      )}
    </>
  )
}
