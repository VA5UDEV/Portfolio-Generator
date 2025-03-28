import React from 'react'
import { Footer } from '@/components'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='h-[82vh] flex flex-col items-center justify-center bg-white p-6'>
      <h1>Home</h1>
      <Link to="/builder"><button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'>Portfolio Builder</button></Link>
    </div>
    <Footer />
    </>
  )
}

export default Home