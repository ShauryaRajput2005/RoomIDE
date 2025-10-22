import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import EditorPage from './pages/EditorPage'
import {useState} from 'react'

function App() {
  const [roomId, setRoomId] = useState("");
  const [clients, setClients] = useState([]);

  return (
    <div className='bg-[#131519] min-h-screen min-w-screen'>
      <Navbar  clients={clients} roomID={roomId}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/editor/:roomId"
          element={<EditorPage  setClients={setClients} setRoomId={setRoomId} />}
        />
      </Routes>
    </div>
  )
}

export default App
