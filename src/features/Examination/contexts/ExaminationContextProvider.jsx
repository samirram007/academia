const { createContext } = require("react");


export const ExaminationConext = createContext({})

const ExaminationContextProvider = ({ children }) => {

    return (
        <ExaminationConext.Provider values={{}}>
            {children}
        </ExaminationConext.Provider>
    )
}
export default ExaminationContextProvider
