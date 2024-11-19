
import { Route } from 'react-router-dom';




import NotFound from '../pages/NotFound';
import { page } from './navigation';

const RenderRoute = (RouteType) => {
  const { path, element, children, isPrivate, authType } = page
  return (
    page.map(({ path, element, children, authType }, i) => {
      if (!children) {
        if (RouteType == 'guest' && !authType) {
          return ['', 'index', 'home'].includes(path) ? <Route key={i} index element={element} />
            :
            <Route key={i} path={path} element={element} />
        }
        else if (RouteType == 'auth' && authType) {
          return ['', 'index', 'dashboard'].includes(path) ? <Route key={i} index element={element} />
            :
            <Route key={i} path={path} element={element} />
        }
        else {
          return <Route key={i} path={path} element={<NotFound />} />
        }
      }
      else if (children) {
        if (RouteType == 'guest' && !authType) {

        }
        else if (RouteType == 'auth' && authType) {
          return <Route key={i} path={path}  >
            <Route key={i} index element={element} />
            {children.map((item, j) => {
              return <Route key={j} path={item.path} element={item.element} />
            })}
          </Route>
        }
        else {
          return <Route key={i} path={path} element={<NotFound />} />
        }
      }

    })
  )
}
export default RenderRoute


