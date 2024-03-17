import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import First from './parts/First'
import Second from './parts/Second'

function App() {

  return (
    <>
      First part:
      <First />
      <hr style={{ marginTop: 20, width: 100 }} />
      Second part:
      <Second />
    </>
  )
}

export default App
