import { createContext } from "react";



const StudentContext=createContext()




export const StudentContextProvider = ({children}) => {
    return (
        <StudentContext.Provider  value={{children}}>
            {children}
        </StudentContext.Provider>
    );
}
export const useStudent = () => useContext(StudentContext);
 
 

