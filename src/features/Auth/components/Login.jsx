import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../../hooks";
import { useAuthLogin } from "../hooks/mutations";



export default function Login() {
    useDocumentTitle("LOGIN")

    const navigate = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const loginMutation =  useAuthLogin()
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        loginMutation.mutate(payload),
        {
            onSuccess: navigate('/')
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown w-full    ">
            <div className="form mt-[2rem]  bg-zinc-700/30  dark:bg-zinc-200/10 rounded-lg">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>

                    <input ref={usernameRef} type="text"
                        placeholder="username"
                        defaultValue={"admin00000"}
                        className=" input-primary w-full   py-2 px-2  "
                    />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        defaultValue={"password"}
                        className=" input-primary w-full   py-2 px-2  "
                    />
                    <button
                        className=" glass   py-2 w-full
                         bg-slate-600 dark:bg-slate-800/10
                     text-zinc-800 dark:text-slate-300
                     hover:bg-slate-800 hover:dark:bg-slate-600
                     text-2xl font-bold"

                    >
                        Login
                    </button>
                    <p className="message hidden text-zinc-800 dark:text-slate-300">
                        Not Registered?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-700 dark:text-blue-400
                            hover:text-blue-600 hover:dark:text-blue-300"
                        >
                            Create an account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
