import { createPortal } from 'react-dom';
const FormikEmptyModal = ({ isModalOpen, children }) => {

    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(10, 10, 20, 0.6)",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
    }
    const modalStyle = {
        right: "0",
        background: "#0f172a",
        margin: "0",
        padding: "0",
        border: "2px solid #00000011",
        borderRadius: "5px",
        boxShadow: "0 0 2px 1px #ddaaaa66",

    }

    if (!isModalOpen) return null;

    return createPortal(
        <>

            <div style={overlay}>
                <div style={modalStyle} className='h-screen max-h-screen min-w-[50%]'>
                    {children}
                </div>
            </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default FormikEmptyModal



