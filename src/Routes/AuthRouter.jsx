import { Routes } from "react-router-dom"
import RenderRoute from "./RenderRoute"



const AuthRouter = () => {
    console.log(RenderRoute('auth'))
    return (


        <Routes>
            {RenderRoute('auth')}
        </Routes>



    )
}
export default AuthRouter