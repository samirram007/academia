/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import LangSelector from '../LangSelector'
import ThemeController from "../ThemeController";
import { Turn as Hamburger } from "hamburger-react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Navbar = ({ userName, onLogout, isOpen, setOpen }) => {
    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    return (
        <>
            <header className="sticky w-full flex justify-between items-center bg-[#272e48] z-50 ">

                <nav
                    className="navbar navbar-static-top pl-30 sticky w-full flex justify-between items-center h-12 top-0 border-danger z-10 px-4 md:px-10">
                    <div className="text-slate-500">{""}</div>

                    <div className="flex gap-6 h-full items-center ">

                        <ThemeController />
                        <LangSelector />
                        <div className="text-accent-2 flex md:hidden ">
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
                        <div className="dropdown dropdown-end z-[10000]">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-lg avatar">
                                <div className="w-40 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content absolute right-0
                            z-50 mt-2 w-64 pt-4 pb-4 mr-4 md:mr-[-1.2rem]
                             animated flipInX origin-top-right rounded-md bg-[#272e48]  shadow-lg ring-1
                             ring-black ring-opacity-5 focus:outline-none gap-4 ">
                                <li className="dropdown-item " >
                                    <a className="justify-start gap-4">
                                        Profile
                                        <span className="badge">{userName}</span>
                                    </a>
                                </li>
                                <li className="dropdown-item   " ><a>Settings</a></li>
                                <li className="dropdown-item   " ><a onClick={onLogout}>Logout</a></li>
                            </ul>


                        </div>
                        <div className='hidden ' >
                            <ul className=' '>
                                <li className=" ">
                                    <div onClick={() => { }} className="waves-effect waves-light rounded-full overflow-hidden h-[40px] w-[40px] dropdown-toggle p-0" data-toggle="dropdown" title="User">
                                        <img className='w-full h-full' src="vite.svg" alt="" />
                                    </div>
                                    <ul className="dropdown-menu animated flipInX absolute right-0  z-50 mt-2 w-48
                                    origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
                                     ring-black ring-opacity-5 focus:outline-none">
                                        <li className="user-body">
                                            <a className="dropdown-item" href="https://school.ctrlaltfix.live/profile/view"><i className="ti-user text-muted mr-2"></i> Profile</a>
                                            <a className="dropdown-item" href="#"><i className="ti-wallet text-muted mr-2"></i> My Wallet</a>
                                            <a className="dropdown-item" href="#"><i className="ti-settings text-muted mr-2"></i> Settings</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="https://school.ctrlaltfix.live/admin/logout"><i className="ti-lock text-muted mr-2"></i> Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </header >

        </>
    );
};

export default Navbar;
