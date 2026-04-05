import { createPortal } from 'react-dom'
import React from 'react'
import { MdOutlineCloseFullscreen } from 'react-icons/md'

const PdfModal =  ({ isOpen, setOpen, label, children } ) => {

    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(15, 23, 42, 0.55)",
        backdropFilter: "blur(2px)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1200,
    }
    const modalStyle = {
        background: "#f8fafc",
        margin: "auto",
        padding: "16px",
        border: "1px solid #cbd5e1",
        borderRadius: "14px",
        boxShadow: "0 24px 60px rgba(15, 23, 42, 0.25)",
        overflowY: "auto",
        maxHeight: "92vh",
        width: "min(96vw, 1500px)",
    }

    if (!isOpen) return null;


    return createPortal(
        <>

            <div style={overlay}>
                <div style={modalStyle}>
                    <div className={`mb-3 flex items-center text-slate-700 ${label ? 'justify-between border-b border-slate-300/80 pb-2' : 'justify-end'}`}>
                        {label ? <div className='text-sm font-semibold tracking-wide'>{label}</div> : <div />}

                        <button onClick={() => setOpen(false)} type="button"
                            className='inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'>
                            <MdOutlineCloseFullscreen className='text-lg' />
                        </button>
                    </div>

                    {children}
                </div>
            </div>

        </>,
        document.getElementById('portal-form')
    )
}

export default PdfModal



