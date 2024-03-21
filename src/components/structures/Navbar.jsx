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
                {/* <nav className="navbar navbar-static-top pl-30">
                    {/* <div>
                        <ul className="nav">
                            <li className="btn-group nav-item">
                                <a href="#" className="waves-effect waves-light nav-link rounded svg-bt-icon" data-toggle="push-menu" role="button">
                                    <i className="nav-link-icon mdi mdi-menu"></i>
                                </a>
                            </li>
                            <li className="btn-group nav-item">
                                <a href="#" data-provide="fullscreen" className="waves-effect waves-light nav-link rounded svg-bt-icon" title="Full Screen">
                                    <i className="nav-link-icon mdi mdi-crop-free"></i>
                                </a>
                            </li>
                            <li className="btn-group nav-item d-none d-xl-inline-block">
                                <a href="#" className="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
                                    <i className="ti-check-box"></i>
                                </a>
                            </li>
                            <li className="btn-group nav-item d-none d-xl-inline-block">
                                <a href="calendar.html" className="waves-effect waves-light nav-link rounded svg-bt-icon" title="">
                                    <i className="ti-calendar"></i>
                                </a>
                            </li>
                        </ul>
                    </div> */}

                {/* <div className="navbar-custom-menu r-side">
                        {/* <ul className="nav navbar-nav">

                            <li className="search-bar">
                                <div className="lookup lookup-circle lookup-right">
                                    <input type="text" name="s"/>
                                </div>
                            </li>

                            <li className="dropdown notifications-menu">
                                <a href="#" className="waves-effect waves-light rounded dropdown-toggle" data-toggle="dropdown" title="Notifications" aria-expanded="false">
                                    <i className="ti-bell"></i>
                                </a>
                                <ul className="dropdown-menu animated bounceIn">

                                    <li className="header">
                                        <div className="p-20">
                                            <div className="flexbox">
                                                <div>
                                                    <h4 className="mb-0 mt-0">Notifications</h4>
                                                </div>
                                                <div>
                                                    <a href="#" className="text-danger">Clear All</a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li>

                                        <div className="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 250px;"><ul className="menu sm-scrol" style="overflow: hidden; width: auto; height: 250px;">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-info"></i> Curabitur id eros quis nunc suscipit blandit.
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-warning text-warning"></i> Duis malesuada justo eu sapien elementum, in semper diam posuere.
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-users text-danger"></i> Donec at nisi sit amet tortor commodo porttitor pretium a erat.
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-shopping-cart text-success"></i> In gravida mauris et nisi
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-user text-danger"></i> Praesent eu lacus in libero dictum fermentum.
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-user text-primary"></i> Nunc fringilla lorem
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-user text-success"></i> Nullam euismod dolor ut quam interdum, at scelerisque ipsum imperdiet.
                                                </a>
                                            </li>
                                        </ul><div className="slimScrollBar" style="background: rgb(0, 0, 0); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 220.07px;"></div><div className="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
                                    </li>
                                    <li className="footer">
                                        <a href="#">View all</a>
                                    </li>
                                </ul>
                            </li>


                            <li className="dropdown user user-menu">
                                <a href="#" className="waves-effect waves-light rounded dropdown-toggle p-0" data-toggle="dropdown" title="User">
                                    <img src="https://school.ctrlaltfix.live/upload/user_images/202302081742token_logo.png" alt=""/>
                                </a>
                                <ul className="dropdown-menu animated flipInX">
                                    <li className="user-body">
                                        <a className="dropdown-item" href="https://school.ctrlaltfix.live/profile/view"><i className="ti-user text-muted mr-2"></i> Profile</a>
                                        <a className="dropdown-item" href="#"><i className="ti-wallet text-muted mr-2"></i> My Wallet</a>
                                        <a className="dropdown-item" href="#"><i className="ti-settings text-muted mr-2"></i> Settings</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="https://school.ctrlaltfix.live/admin/logout"><i className="ti-lock text-muted mr-2"></i> Logout</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" data-toggle="control-sidebar" title="Setting" className="waves-effect waves-light">
                                    <i className="ti-settings"></i>
                                </a>
                            </li>

                        </ul>
                    </div>
                </nav> */}
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
                                        <img className='w-full h-full' src="https://school.ctrlaltfix.live/upload/user_images/202302081742token_logo.png" alt="" />
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
