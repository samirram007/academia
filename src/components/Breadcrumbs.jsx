import { TiHome } from "react-icons/ti";
import { Link, useLocation } from 'react-router';
import { ToWordCase } from '../libs/utils';

const Breadcrumbs = ({title}) => {
    const location=useLocation()

    const pathnames = location.pathname.split('/')
    .filter(
        (path) => path!== '' && path!== 'dashboard' && path!== 'login' && path!== 'logout'
    )

    return (
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 py-1">
            <Link to="/dashboard" className="inline-flex items-center text-slate-400 hover:text-blue-600 dark:hover:text-blue-300">
                <TiHome />
            </Link>
            {
                pathnames ?
                    pathnames.length > 1 ?
                        <>
                            <span className="text-slate-300 dark:text-slate-600">/</span>
                            <Link to={`/${pathnames[0]}`} className="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200">{title ?? ToWordCase(pathnames[0])}</Link>
                            <span className="text-slate-300 dark:text-slate-600">/</span>
                            <span className='font-medium text-blue-600 dark:text-blue-300'>{ToWordCase(pathnames[1])}</span>
                        </>

                        :
                        <>
                            <span className="text-slate-300 dark:text-slate-600">/</span>
                            <span className='font-medium text-blue-600 dark:text-blue-300'>{title ?? ToWordCase(pathnames[0])}</span>
                        </>
                    : null

            }
        </nav>
    )
}

export default Breadcrumbs
