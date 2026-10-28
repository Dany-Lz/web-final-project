import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [paises, setPaises] = useState([])
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Vite redirige esto a http://localhost:8080/api/paises
    fetch('/api/paises')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los países')
        return res.json()
      })
      .then(data => {
        setPaises(data)
        setCargando(false)
      })
      .catch(err => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  if (cargando) return <p>Cargando países...</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Países registrados en la BD</h1>
      <ul>
        {paises.map(p => (
          <li key={p.id}>
            <strong>{p.nombre}</strong> (ID: {p.id})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App