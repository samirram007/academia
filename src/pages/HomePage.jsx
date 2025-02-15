import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="flex flex-col
         justify-center items-center w-screen h-screen border-[40px] rounded border-slate-500/20">
            <div className="w-[25rem] md:w-[20rem] h-[25rem] flex flex-col  gap-10
         justify-center items-center border-2 rounded-md bg-slate-500/20">

                <div className="flex flex-col justify-start items-center">

                    <div><CiUser className="text-[100px]" /></div>
                    <div className="text-2xl font-bold">Click to login</div>
                </div>
                <NavLink to={'/login'} className="text-4xl  font-bold  px-6 py-2 
            rounded-xl
            shadow-md
            border-2 border-violet-400
                   text-white">Login</NavLink>

            </div>
        </div>
    )
}

export default HomePage