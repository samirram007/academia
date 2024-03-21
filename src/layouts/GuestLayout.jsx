
import { Navigate, Outlet } from 'react-router-dom'

const GuestLayout = () => {
  return (
    <>
     <div>Guest Layout</div>
      <Navigate to="/login"   />
      <Outlet/>
      </>
  )
}
export default GuestLayout