import { NavLink } from "react-router-dom"

const HomePage = () => {
    return (
        <div className="flex justify-center items-center h-screen ">
            <NavLink to={'/login'} className="text-4xl  font-bold  px-6 py-2 
            shadow-md
            border-2 border-violet-400
                 rounded text-white">Login</NavLink>

        </div>
    )
}

export default HomePage