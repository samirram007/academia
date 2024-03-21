
import { useLocation } from "react-router-dom"
import {page} from '../Routes/navigation'
export const  useCustomRoutes = () => {
    const location=useLocation()
    const thisRoute=page.find(item=>item.path===location.pathname.replace('/','')) || page[0]
       return (thisRoute.name);

}
