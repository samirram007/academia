import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client.js";
import { toastr } from "react-redux-toastr";

export default function EditUser(){
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
    });

    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axiosClient
            .get(`/users/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data);

            })
            .catch(() => {
                setLoading(false);
            });
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    toastr("User was successfully updated");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/users", user)
                .then(() => {
                    toastr("User was successfully created");
                    navigate("/users");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <>
            <div className="card animated fadeInDown  bg-zinc-700/30  dark:bg-zinc-200/10">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <>
                        {!user.id && <h1>New User</h1>}
                        {user.id && <h1>Update User: {user.name}</h1>}
                        <form onSubmit={onSubmit}>
                            <input
                                defaultValue={user.name}
                                onChange={(ev) =>
                                    setUser({ ...user, name: ev.target.value })
                                }
                                placeholder="Name"
                            />
                            <input
                                value={user.email}
                                type="email"
                                onChange={(ev) =>
                                    setUser({ ...user, email: ev.target.value })
                                }
                                placeholder="Email"
                            />
                            <input
                                type="password"
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password: ev.target.value,
                                    })
                                }
                                placeholder="Password"
                            />
                            <input
                                type="password"
                                onChange={(ev) =>
                                    setUser({
                                        ...user,
                                        password_confirmation: ev.target.value,
                                    })
                                }
                                placeholder="Password Confirmation"
                            />
                            <div className="flex justify-center">
                                <button
                                    className="btn glass btn-wide mx-auto self-center

                                        bg-slate-600 dark:bg-slate-800/10
                                    text-zinc-800 dark:text-slate-300
                                    hover:bg-slate-800 hover:dark:bg-slate-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    );
}
