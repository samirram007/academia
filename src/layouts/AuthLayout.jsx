
import { Outlet } from 'react-router-dom'
import {Navbar,Sidebar} from '../components/structures'

import { useState } from 'react';

import Loader from '../components/Loader';
import { useAuthLogout } from '../features/Auth';
import { useAuthUser } from '../features/Auth';


const AuthLayout = () => {


  const authUser = useAuthUser()
  const logout = useAuthLogout()
  const [isOpen, setOpen] = useState(true);


  const onLogout = (ev) => {
    ev.preventDefault();
    logout.mutate()
  }
  if (authUser.isLoading) {
    return (<Loader />)
  }
  if (authUser.isError) {
    return (<div className="w-full h-full flex justify-center items-center">
      <h1 className="text-4xl">Error...</h1>
    </div>)
  }
  return (
    <div className='flex flex-row h-screen  w-screen relative bg-[#272e48] '>

      <Sidebar isOpen={!isOpen} setOpen={() => { setOpen(!isOpen) }} />
      <div className=' flex-1 relative   w-full h-full flex flex-col justify-start items-center  '>
        <Navbar isOpen={isOpen} setOpen={setOpen} userName={authUser.data.name} onLogout={onLogout} />

        <div className='overflow-y-auto w-full mr-2 h-full px-2'>
          <div className='overflow-y-auto flex flex-col items-center  p-2 md:p-4 mb-2  bg-slate-900  rounded-lg'>
            <Outlet />
          </div>

        </div>

      </div>
    </div>

  )
}

export default AuthLayout
