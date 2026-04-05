import { Navigate, Route, Routes } from 'react-router'
import RenderRoute from "./RenderRoute"



const AuthRouter = () => {
    return (


        <Routes>
            <Route
                index
                element={<Navigate to="/dashboard" replace />}
            />
            <Route
                path="/frontend"
                element={<Navigate to="/dashboard" replace />}
            />
            {RenderRoute('auth')}
        </Routes>



    )
}
export default AuthRouter