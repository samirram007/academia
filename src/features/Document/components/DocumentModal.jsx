import {createPortal} from 'react-dom'
import React from 'react'




const DocumentModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;



    return  createPortal(
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 px-4 py-6 backdrop-blur-[1px]">
                <div className="w-[1100px] max-w-[95vw] h-[760px] max-h-[90vh] rounded-xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default DocumentModal