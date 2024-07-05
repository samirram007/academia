/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const FeeContext = createContext({
    user: null,
    token: null,
    role:null,
    setUser: () => {},
    setToken: () => {},
});

export const FeeProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [role, setRole] = useState('admin');
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <FeeContext.Provider  value={{user,token,role,setUser,setToken,setRole}}>
            {children}
        </FeeContext.Provider>
    );
};
export const useFee = () => useContext(FeeContext);

