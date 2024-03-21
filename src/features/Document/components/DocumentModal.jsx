import {createPortal} from 'react-dom'
import React from 'react'




const DocumentModal = ({ isOpen, onClose, children }) => {
    const overlay={
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(200, 200, 200, 0.2)",
        padding:"20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
    const  modalStyle= {
        background: "#0f172a",
        margin: "auto",
        padding: "20px",
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: "2px solid black",
        overflowY: "scroll",
        maxHeight:"90vh"
    }

    if (!isOpen) return null;



    return  createPortal(
        <>
            <div style={overlay}>
                <div style={modalStyle}>
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default DocumentModal