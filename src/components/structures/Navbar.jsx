/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import LangSelector from '../LangSelector';
import ThemeController from "../ThemeController";

const Navbar = ({ userName, onLogout, isOpen, setOpen }) => {
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const safeUserName = typeof userName === 'string' && userName.trim() ? userName.trim() : 'User';
    const userInitial = safeUserName.charAt(0).toUpperCase();

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        const onClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    return (
        <>
            <header className="sticky top-0 w-full z-40 border-b border-blue-200/70 dark:border-blue-300/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-sm">

                <nav
                    className="w-full flex justify-between items-center h-14 md:h-16 z-10 px-4 md:px-6 lg:px-8">
                    <div className="text-slate-500 font-semibold tracking-wide">Workspace</div>

                    <div className="flex gap-3 md:gap-5 h-full items-center">

                        <ThemeController />
                        <LangSelector />
                        <div className="text-blue-600 dark:text-blue-300 flex md:hidden">
                            <Hamburger
                                className="  "
                                easing="ease-in"
                                hideOutline={true}
                                toggled={!isOpen}
                                toggle={setOpen}
                                onToggle={() => {
                                    toggleMenu();
                                }}
                            />
                        </div>
                        <div ref={profileRef} className="relative z-[10000]">
                            <button
                                type="button"
                                aria-label="Open profile menu"
                                onClick={() => setProfileOpen((prev) => !prev)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-semibold text-white shadow-sm ring-2 ring-blue-500/25 transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 md:h-11 md:w-11"
                            >
                                <span aria-hidden="true">{userInitial}</span>
                            </button>

                            <ul className={`${isProfileOpen ? 'block' : 'hidden'} menu menu-sm absolute right-0
                            z-50 mt-2 w-64 pt-3 pb-3 mr-0 md:mr-1
                             animated fadeInDown origin-top-right rounded-xl bg-white dark:bg-slate-900 shadow-lg ring-1
                             ring-blue-200/70 dark:ring-blue-300/10 focus:outline-none gap-2`}>
                                <li className="dropdown-item " >
                                    <a className="justify-start gap-3 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg">
                                        Profile
                                        <span className="badge bg-blue-600 text-white border-none">{safeUserName}</span>
                                    </a>
                                </li>
                                <li className="dropdown-item" ><a className="text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg">Settings</a></li>
                                <li className="dropdown-item" ><a className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" onClick={(ev) => { setProfileOpen(false); onLogout(ev); }}>Logout</a></li>
                            </ul>


                        </div>
                    </div>
                </nav>
            </header >

        </>
    );
};

export default Navbar;
