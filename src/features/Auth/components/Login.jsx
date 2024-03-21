import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDocumentTitle } from "../../../hooks";
import { useAuthLogin } from "../hooks/mutations";



export default function Login() {
    useDocumentTitle("LOGIN")


    const usernameRef = useRef();
    const passwordRef = useRef();

    const loginMutation =  useAuthLogin()
    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        loginMutation.mutate(payload)
    };

    return (
        <div className="login-signup-form animated fadeInDown w-full    ">
            <div className="form mt-[2rem]  bg-zinc-700/30  dark:bg-zinc-200/10 rounded-lg">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>

                    <input ref={usernameRef} type="text" placeholder="username" defaultValue={"admin00000"} />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        defaultValue={"password"}
                    />
                    <button
                        className="btn glass btn-block
                         bg-slate-600 dark:bg-slate-800/10
                     text-zinc-800 dark:text-slate-300
                     hover:bg-slate-800 hover:dark:bg-slate-600"
                    >
                        Login
                    </button>
                    <p className="message text-zinc-800 dark:text-slate-300">
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
