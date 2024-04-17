import { useEffect } from "react"
import { set } from "react-hook-form";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = (param) => {
    const location = useLocation();
    useEffect(() => {
        document.title = `${import.meta.env.VITE_APP_NAME} | LOADING...`
        setTimeout(() => {
            param = param ??
                location.pathname.split("_")
                    .filter(x => x.length > 0)
                    .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
                    .join(" ")
                    .toUpperCase()
                    .replace(/\//g, " ")
            document.title = param === '' ?
                import.meta.env.VITE_APP_NAME :
                `${import.meta.env.VITE_APP_NAME} | ${param}`;
        }, 1000);

    }, [param])
}


