import React, { createContext, useContext, useState } from "react";

const FormModalContext = createContext({
    isOpen: true,
    setOpen: () => {},
});

export const FormModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const setOpen = (open) => {

        setIsOpen(open);
    };

    return (
        <FormModalContext.Provider value={{isOpen, setOpen}}>
            {children}
        </FormModalContext.Provider>
    );
};

export const useFormModal = () => useContext(FormModalContext);