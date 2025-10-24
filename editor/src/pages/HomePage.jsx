import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function HomePage() {
  const [roomId, setRoomId] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const joinRoom = () => {
    if (!roomId || !name) {
      toast.error('Room ID or name is missing')
      return
    }
    navigate(`editor/${roomId}`, { state: { name } })
  }

  const createRoom = (e) => {
    e.preventDefault()
    const id = uuidV4()
    setRoomId(id)
    toast.success('Created a new Room')
  }

  const handleInput = (e) => {
    if (e.code === 'Enter') joinRoom()
  }

  return (
    <div className="bg-[#131417] min-h-screen flex items-center justify-center overflow-hidden">
      <div className=" max-w-[90%]  min-w-1/3 min-h-1/3 bg-[#1e1e1e] border-none rounded-3xl p-8 shadow-lg flex flex-col gap-8 items-center justify-evenly ">
        <h3 className="text-[#3ea061] text-3xl font-bold text-center">
          Join or Create a Room
        </h3>

        <div className="flex flex-col gap-4 w-4/5 h-[100px] flex justify-evenly">
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onKeyUp={handleInput}
            className="w-full px-4 py-3 rounded-full bg-[#2b2b2b] text-white placeholder-gray-400 border border-[#333] focus:border-[#3ea061] focus:ring-0 outline-none transition-colors"
          />

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={handleInput}
            className="w-full px-4 py-3 rounded-full bg-[#2b2b2b] text-white placeholder-gray-400 border border-[#333] focus:border-[#3ea061] focus:ring-0 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center flex-col justify-between gap-3 w-4/5">
          <button
            onClick={joinRoom}
            className="w-1/2 bg-[#3ea061] text-white rounded-full py-3 font-semibold hover:bg-[#358a53] transition-colors"
          >
            Join
          </button>

          <p className="text-sm text-gray-300">
            Don’t have a Room ID?{' '}
            <span
              onClick={createRoom}
              className="text-[#3ea061] cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>

  )
}

export default HomePage;

