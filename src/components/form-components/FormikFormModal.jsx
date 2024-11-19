import { createPortal } from 'react-dom'
import { MdOutlineCloseFullscreen } from 'react-icons/md'
import { useFormModal } from '../../contexts/FormModalProvider'
const FormikFormModal = ({ label, children }) => {
    const { isOpen, setOpen } = useFormModal()

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
        right:"0",
        background: "#0f172a",
        margin: "0",
        padding: "0",
        border: "2px solid #00000011",
        borderRadius: "5px",
        boxShadow: "0 0 2px 1px #ddaaaa66",

    }

    if (!isOpen) return null;



    return createPortal(
        <>

            <div style={overlay}>
                <div style={modalStyle} className='h-screen max-h-screen max-w-[100%] md:max-w-[90%] lg:max-w-[70%] xl:max-w-[60%]'>
                    {
                        label &&
                        <div className=' py-1 px-2   '>
                            <div className='flex justify-between items-center
                            border-b-2 border-slate-600/50 pb-1' >
                            <div className='text-xl font-bold' >{label}</div>
                            <button onClick={() => setOpen(false)} type="button"
                                className='rounded-full p-2
 bg-slate-50/5 text-orange-500 cursor-pointer
  hover:text-yellow-500 hover:bg-slate-600
   active:text-orange-600 active:touch-pinch-zoom '>
                                <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                            </button>
                        </div>
                        </div>

                    }

                    {children}
                </div>
            </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default FormikFormModal



