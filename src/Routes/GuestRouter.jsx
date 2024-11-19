import { Suspense } from "react"
import { Routes } from "react-router-dom"
import Loader from "../components/Loader"
import RenderRoute from "./RenderRoute"


const GuestRouter = () => {
    return (

        <Suspense fallback={<Loader />}>
            <Routes>

                {RenderRoute('guest')}

            </Routes>
        </Suspense>

    )
}

export default GuestRouter