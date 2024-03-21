import { useEffect } from "react"

export const  useDocumentTitle = (param) => {
    useEffect(()=>{
        document.title = param===''?
        import.meta.env.VITE_APP_NAME :
        `${import.meta.env.VITE_APP_NAME} | ${param}` ;
    },[param])
}


