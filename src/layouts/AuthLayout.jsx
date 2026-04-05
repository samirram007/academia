
import { Navbar, Sidebar } from '../components/structures';

import { Suspense, useState } from 'react';

import Loader from '../components/Loader';
import { useAuthLogout, useAuthUser } from '../features/Auth';


const AuthLayout = ({ children }) => {
  const authUser = useAuthUser()
  const logout = useAuthLogout()
  const [isOpen, setOpen] = useState(true);


  const onLogout = (ev) => {
    ev.preventDefault();
    logout.mutate()
  }
  if (authUser.isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
        <Loader size={16} label="Loading workspace..." />
      </div>
    )
  }
  if (authUser.isError) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 px-4">
        <div className="rounded-2xl border border-red-300/40 bg-red-500/10 px-6 py-5 text-center text-red-700 dark:text-red-300">
          <h1 className="text-2xl font-semibold">Authentication Error</h1>
          <p className="mt-2 text-sm">Unable to load your authenticated session.</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen w-full flex bg-gradient-to-br from-slate-100 to-white dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 overflow-hidden'>
      <Sidebar isOpen={isOpen} setOpen={setOpen} />

      <div className='flex-1 relative min-w-0 flex flex-col'>
        <Navbar isOpen={isOpen} setOpen={setOpen} userName={authUser.data.name} onLogout={onLogout} />

        <main className='flex-1 p-3 md:p-4 lg:p-6 overflow-hidden'>
          <div className='h-full w-full overflow-auto'>
            <Suspense
              fallback={
                <div className='h-full w-full' />
              }
            >
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuthLayout
