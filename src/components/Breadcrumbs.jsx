import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {  ToWordCase } from '../libs/utils'
import { TiHome } from "react-icons/ti";
const Breadcrumbs = ({title}) => {
    const location=useLocation()

    const pathnames = location.pathname.split('/')
    .filter(
        (path) => path!== '' && path!== 'dashboard' && path!== 'login' && path!== 'logout'
    )

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                <li><Link to="/dashboard"><TiHome/></Link></li>
                {
                    pathnames ?
                    pathnames.length >1 ?
                    <>
                    <li><Link to={`/${pathnames[0]}`}>{title??ToWordCase(pathnames[0])}</Link></li>
                     <li className='active !text-[#7480ff]'>{ToWordCase(pathnames[1])}</li>
                    </>

                      :
                     <li className='active !text-[#7480ff]'>{title??ToWordCase(pathnames[0])}</li>
                   : null

                }
            </ul>
        </div>
    )
}

export default Breadcrumbs
