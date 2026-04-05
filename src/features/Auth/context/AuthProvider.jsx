/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    user: null,
    token: null,
    role:null,
    setUser: () => {},
    setToken: () => {},
    isGuest: null,
    setGuest: () => { },
    isLoading: null,
    setLoading: () => { }
});

export const AuthProvider = ({ children }) => {
    const initialToken = localStorage.getItem("ACCESS_TOKEN");
    const [user, setUser] = useState({});
    const [isGuest, setGuest] = useState(!initialToken);
    const [isLoading, setLoading] = useState(true);
    const [role, setRole] = useState('admin');
    const [token, _setToken] = useState(initialToken);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            setGuest(false)
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            setGuest(true)
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    useEffect(() => {
        setGuest(!token);
        // const timer = setTimeout(() => {
        // setLoading(false); // Stop loading after 1.5s
        //     if (token) setGuest(false)
        // }, 500);

        // Clean up the timer when the component unmounts
        // return () => clearTimeout(timer);
    }, [token]);

    return (
        <AuthContext.Provider value={{
            user, token, role,
            setUser, setToken, setRole,
            isGuest, setGuest, isLoading, setLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);

