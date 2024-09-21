import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaBars } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import LeftBar from '../shared/LeftBar'

export default function Admin() {
  const [show, setShow] = useState(false)
  return (
    <section>
      <div className='flex justify-between lg:hidden p-5 bg-primary text-white'>
        <Link to='/'>Home</Link>
        <button onClick={() => setShow(!show)}>
          {show ? (
            <IoMdClose className='text-xl' />
          ) : (
            <FaBars className='text-xl' />
          )}
        </button>
      </div>
      {show && <LeftBar setShow={setShow} />}
      <div className='lg:flex mx-5 md:mx-0'>
        <div className='hidden lg:block lg:w-1/6 '>
          <LeftBar />
        </div>

        <div className='lg:w-5/6'>
          <Outlet />
        </div>
      </div>
    </section>
  )
}
