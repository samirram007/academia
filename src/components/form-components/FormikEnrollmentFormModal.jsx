import { createPortal } from 'react-dom'
import React from 'react'
import { MdOutlineCloseFullscreen } from 'react-icons/md'
import { FormModalProvider, useFormModal } from '../../contexts/FormModalProvider'
const FormikEnrollmentFormModal = ({ isOpen,setOpen,  label, children }) => {

    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(20, 20, 20, 0.8)",
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const modalStyle = {
        background: "#0f172a",
        margin: "auto",
        padding: "20px",
        border: "5px solid #00000011",
        borderRadius: "10px",
        boxShadow: "0 0 5px 2px #ddaaaa66",
        overflowY: "scroll",
        maxHeight: "90vh"
    }

    if (!isOpen) return null;



    return createPortal(
        <>

                <div style={overlay}>
                    <div style={modalStyle}>
                        {
                            label &&
                            <div className='flex justify-between items-center
                            border-b-2 border-slate-600/50 pb-2   ' >
                                <div>{label}</div>
                                <button onClick={()=>setOpen(false)} type="button"
                                    className='rounded-full p-2
 bg-slate-50/5 text-orange-500 cursor-pointer
  hover:text-yellow-500 hover:bg-slate-600
   active:text-orange-600 active:touch-pinch-zoom '>
                                    <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                                </button>
                            </div>
                        }

                        {children}
                    </div>
                </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default FormikEnrollmentFormModal



