import { Suspense } from "react"
import { Navigate, Route, Routes } from 'react-router'
import Loader from "../components/Loader"
import RenderRoute from "./RenderRoute"


const GuestRouter = () => {
    return (

        <Suspense fallback={<Loader />}>
            <Routes>
                <Route
                    path="/frontend"
                    element={<Navigate to="/" replace />}
                />
                {RenderRoute('guest')}

            </Routes>
        </Suspense>

    )
}

export default GuestRouter