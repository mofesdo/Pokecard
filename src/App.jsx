import { useState } from 'react'
import './App.css'

function App() {
  const [activeModal, setActiveModal] = useState("");

  return (
    <>
    <button className='card__btn'>Create Catch Card</button>
      <div className='card'>
        
      </div>
    </>
  )
}

export default App
