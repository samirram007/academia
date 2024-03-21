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
        console.clear()
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


            <div className="dropdown dropdown-end  mx-3 text-orange-400 w-5    md:mx-3 ">
                <div tabIndex={0} role="button" className=" text-lg m-1" onClick={() => { setOpen(!isOpen) }}><GrLanguage /></div>
                <motion.ul animate={isOpen ? "enter" : "exit"}
                    variants={subMenuAnimate} tabIndex={0} className={!isOpen ? `hidden` : `dropdown-content z-[1] menu p-2 shadow-lg bg-zinc-900/70  md:bg-blue-100/10 rounded-box w-32 -mr-14 md:mr-0  mt-2`}>
                    <li onClick={e => handleClick('en')}><a>English</a></li>
                    <li onClick={e => handleClick('hi')}><a>Hindi</a></li>
                    <li onClick={e => handleClick('bn')}><a>Bengali</a></li>
                </motion.ul>
            </div >

        </>

    )
}
