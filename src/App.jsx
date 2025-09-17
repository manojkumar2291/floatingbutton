import { useState } from 'react'
import FloatingButton from './floatingbutton/FloatingButton'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FloatingButton/>
    </>
  )
}

export default App
