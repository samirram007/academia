import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'

const FormikEditFormModal = ({ isOpen, setOpen, label, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-end"
            style={{ background: "rgba(15, 23, 42, 0.45)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
            <div className="relative flex flex-col h-screen max-h-screen w-full max-w-[100%] md:max-w-[96%] lg:max-w-[88%] xl:max-w-[84%] 2xl:max-w-[78%] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-700/60">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/60 shrink-0">
                    <div>
                        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">{label}</h2>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Fill in the details below</p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        type="button"
                        aria-label="Close"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                        <MdClose className="text-lg" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-5">
                    {children}
                </div>
            </div>
        </div>,
        document.getElementById('portal-form')
    )
}

export default FormikEditFormModal



