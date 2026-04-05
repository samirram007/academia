import  { useState, useEffect } from 'react'
import { GrLanguage } from "react-icons/gr"; import i18next from 'i18next';
// import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"

export default function LangSelector() {
    const [isOpen, setOpen] = useState(false)
    const [lang, setLang] = useState(localStorage.getItem('language') == null ? 'en' : localStorage.getItem('language'))
    const handleClick = (lang) => {
        setOpen(prev => !prev)
        setLang(lang)

    }
    useEffect(() => {
        localStorage.setItem('language', lang)
        i18next.changeLanguage(lang)
        // console.clear()
    }, [lang])

    const subMenuAnimate = {
        enter: {
            opacity: 1,
            rotateX: 0,
            transition: {
                duration: 0.5
            },
            display: "flex"
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.5,
                delay: 0
            }, display: "none",
            transitionEnd: {
                display: "none"
            }
        }
    };
    return (
        <>

            <div className="relative mx-2 md:mx-3">
                <button
                    type="button"
                    aria-label="Choose language"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200/70 bg-white/80 text-orange-400 transition hover:bg-blue-50 dark:border-blue-300/20 dark:bg-slate-800 dark:hover:bg-slate-700"
                    onClick={() => { setOpen(!isOpen) }}
                >
                    <GrLanguage className="text-base" />
                </button>

                <motion.ul animate={isOpen ? "enter" : "exit"}
                    variants={subMenuAnimate}
                    className={!isOpen ? `hidden` : `absolute right-0 z-[100] mt-2 w-32 rounded-lg border border-blue-200/70 bg-white p-2 shadow-lg dark:border-blue-300/10 dark:bg-slate-900`}
                >
                    <li onClick={e => handleClick('en')}><button type="button" className="w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">English</button></li>
                    <li onClick={e => handleClick('hi')}><button type="button" className="w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">Hindi</button></li>
                    <li onClick={e => handleClick('bn')}><button type="button" className="w-full rounded-md px-2 py-1.5 text-left text-sm text-slate-700 hover:bg-blue-50 dark:text-slate-200 dark:hover:bg-slate-800">Bengali</button></li>
                </motion.ul>
            </div >

        </>

    )
}
