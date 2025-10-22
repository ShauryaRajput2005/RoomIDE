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
    <div className='h-screen w-full flex flex-col bg-[#131519 ] justify-center items-center'>

        <div className='w-1/3 bg-[#1e1e1e] h-1/3  flex flex-col gap-6 justify-center items-center p-8 rounded- '>
          
          <p className='text-white text-xl font-semibold text-center'>
            Join or Create a Room
          </p>

          <div className='flex flex-col gap-4 w-full items-center'>
            <input
              type='text'
              placeholder='Room ID'
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyUp={handleInput}
              className='rounded-full px-4 py-2 bg-[#2b2b2b] w-[80%] border border-[#38cd5f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38cd5f]'
            />
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={handleInput}
              className='rounded-full px-4 py-2 bg-[#2b2b2b] border-b w-[80%] order-[#38cd5f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#38cd5f]'
            />
          </div>

          <div className='flex flex-col items-center gap-3 w-full'>
            <button
              onClick={joinRoom}
              className='w-full bg-[#38cd5f] text-white rounded-2xl px-6 py-2 hover:bg-[#2faa4c] hover:scale-[1.02] transition duration-200'
            >
              Join
            </button>

            <p className='text-sm text-gray-300'>
              Don’t have a Room ID?{' '}
              <span
                onClick={createRoom}
                className='text-[#49de6f] cursor-pointer hover:underline'
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

        