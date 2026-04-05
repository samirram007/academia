const { useContext } = require("react")
const { ExaminationConext } = require("../ExaminationContextProvider")


const useExaminationContext = () => {
    return useContext(ExaminationConext)
}
export default useExaminationContext