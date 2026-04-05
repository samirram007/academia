import { useEffect } from "react";
import { useLocation } from 'react-router';

export const useDocumentTitle = (param) => {
    const location = useLocation();

    const formatPathTitle = () => {
        return location.pathname
            .split("/")
            .filter(x => x.length > 0)
            .map((x) => (x.charAt(0).toUpperCase() + x.slice(1)))
            .join(" ")
            .toUpperCase();
    };

    useEffect(() => {
        const resolvedTitle = param ?? formatPathTitle();
        document.title = resolvedTitle === ''
            ? import.meta.env.VITE_APP_NAME
            : `${import.meta.env.VITE_APP_NAME} | ${resolvedTitle}`;
    }, [param, location.pathname])
}


