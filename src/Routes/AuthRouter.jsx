import { Routes } from "react-router-dom"
import RenderRoute from "./RenderRoute"



const AuthRouter = () => {
    return (


        <Routes>
            {RenderRoute('auth')}
        </Routes>



    )
}
export default AuthRouter