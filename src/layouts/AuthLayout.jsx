
import { useLocation } from 'react-router-dom';
import { Navbar, Sidebar } from '../components/structures';

import { useState } from 'react';

import Loader from '../components/Loader';
import { useAuthLogout, useAuthUser } from '../features/Auth';


const AuthLayout = ({ children }) => {
  const location = useLocation()
  const authUser = useAuthUser()
  const logout = useAuthLogout()
  const [isOpen, setOpen] = useState(true);


  const onLogout = (ev) => {
    ev.preventDefault();
    logout.mutate()
  }
  if (authUser.isLoading) {
    return (<Loader size={32} />)
  }
  if (authUser.isError) {
    return (<div className="w-full h-full flex justify-center items-center">
      <h1 className="text-4xl">Error...</h1>
    </div>)
  }
  return (
    <div className='flex flex-row h-screen  w-screen max-w-screen relative bg-[#272e48]  overflow-hidden'>

      <Sidebar isOpen={!isOpen} setOpen={() => { setOpen(!isOpen) }} />
      <div className=' flex-1 relative   w-full h-screen min-h-screen max-h-screen flex flex-col justify-start items-center  '>
        <Navbar isOpen={isOpen} setOpen={setOpen} userName={authUser.data.name} onLogout={onLogout} />

        <div className='  w-full    mr-2 h-full    '>
          <div className='  flex flex-col items-center  md:p-2 md:ml-4 mb-2  bg-slate-900  rounded-lg 
          mx-auto w-[90vw] md:w-[78vw] lg:w-[80vw] xl:w-[82vw] 2xl:w-[87vw] h-[85vh] 2xl:h-[90vh] '>
            {/* {
              location.pathname === '/' ? <Dashboard /> : 
            } */}
            {children}

          </div>

        </div>

      </div>
    </div>

  )
}

export default AuthLayout
