
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {GuestLayout,AuthLayout} from '../layouts'

import Loader from '../components/Loader';


import { useAuth } from '../contexts'
import { page } from './navigation'

export const RenderRoute = () => {
  const { path, element, children } = page
  return (
    page.map(({ path, element, children }, i) => {
      if (!children) return <Route key={i} path={path} element={element} />

      return (

        <Route key={i} path={path}  >
          <Route key={i} index   element={element} />
          {children.map((item, j) => {
            return <Route key={j} path={item.path} element={item.element} />
          }
          )}</Route>
      )
    })
  )
}
const GuestRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<GuestLayout />}  >
            {RenderRoute()}

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter >
  )
}
const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p> Loading...</p>}>
        <Routes>
          <Route path="/" element={<AuthLayout />}  >
            {RenderRoute()}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>

  )
}
// const isAuth=true
const Router = () => {
  const { token, user } = useAuth();

  return token ? <AuthRouter /> : <GuestRouter />;
}
export default Router


