import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { NavLink, useLocation } from 'react-router';
import { menuGroup, page } from "../../Routes/navigation";
import BrandMark from "../BrandMark";
import { warmupCriticalRoutes, warmupRoute } from "../../utils/routeWarmup";


const checkActive = (param) => {
  const location = useLocation();

  if (param.replaceAll("/", "") === location.pathname.replaceAll("/", "")) {

    return true
  }
  else {
    return false
  }
}
export const RenderMenuGroup = ({ isOpen, setOpen, group }) => {
  return (
    menuGroup.map(({ name, visible, sort }, i) => {



      return (
        visible ?
          <Fragment key={i}>
            <li className="menu-header">{name}</li>
            <RenderMenu isOpen={isOpen} setOpen={setOpen} menuGroupData={{ name, visible, sort }} />
          </Fragment>
          :
          <Fragment key={i}>
            <RenderMenu isOpen={isOpen} setOpen={setOpen} menuGroupData={{ name, visible, sort }} />
          </Fragment>
      )

    })
  )
}
export const RenderMenu = ({ isOpen, setOpen, menuGroupData }) => {
  const getWarmupHandlers = (routePath) => ({
    onMouseEnter: () => warmupRoute(routePath),
    onFocus: () => warmupRoute(routePath),
    onPointerDown: () => warmupRoute(routePath),
  });

  return (
    page.map(({ path, name, element, children, icon, isMenu, menuGroup }, i) => {

      if (!isMenu) return

      if (!children && menuGroup == menuGroupData.name) {
        return (
          <li className={`flex flex-row gap-2 items-center min-h-[1rem] ${menuGroupData.visible ? 'pl-2' : ''}`} key={i}>
            {icon ?? <MdOutlineDashboard />}
            <NavLink to={`/${path}`} {...getWarmupHandlers(path)} className="rounded-md px-2 py-1 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-colors">
              {name}
            </NavLink>
          </li>
        )
      }


      if (children && menuGroup == menuGroupData.name)

        if (children.filter(x => x.isMenu).length == 0) {
          return (
            <li className={`flex flex-row gap-2 items-center min-h-[1rem] ${menuGroupData.visible ? 'pl-2' : ''}`} key={i}>
              {icon ?? <MdOutlineDashboard />}
              <NavLink to={`/${path}`} {...getWarmupHandlers(path)} className="rounded-md px-2 py-1 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-colors">
                {name}
              </NavLink>
            </li>
          )
        }
        else {
          return (
            <li key={i} className={`collapse collapse-arrow collapse-menu w-full ${menuGroupData.visible ? 'pl-2' : ''}`}>
              <input type="radio" name={`my-menu-1`} className="accordion-checkbox" />
              <div className="flex flex-row gap-2 items-center collapse-title collapse-title-custom text-slate-700 dark:text-slate-200">{icon ?? <MdOutlineDashboard />}{name}</div>
              <ul key={i} className="pl-2 collapse-content flex flex-col gap-2">
                <li className="flex flex-row gap-2 items-center min-h-[1rem] " key={i}   >
                  <TfiLayoutListThumb />
                  <NavLink to={`/${path}`} {...getWarmupHandlers(path)} className={`w-full h-full rounded-md px-2 py-1 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-colors ${checkActive(path) ? "text-blue-600 dark:text-blue-300" : ""}`} >
                    {name}
                  </NavLink>
                </li>
                {children.map((item, j) => {
                  if (!item.isMenu) return
                  return <li className="flex flex-row gap-2 items-center min-h-[1rem]" key={j} path={`/>${item.path}`}   >
                    {item.icon ?? <MdOutlineDashboard />}
                    <NavLink to={`/${path}/${item.path}`} {...getWarmupHandlers(path)} className={`w-full h-full rounded-md px-2 py-1 hover:bg-blue-50/80 dark:hover:bg-slate-800 transition-colors ${checkActive(path + item.path) ? "text-blue-600 dark:text-blue-300" : ""}`}>
                      {item.name}
                    </NavLink>
                  </li>
                }
                )}
              </ul>
            </li>

          )
        }
    })
  )
}

const Sidebar = ({ isOpen, setOpen }) => {
  const { t } = useTranslation()
  const menuClass = isOpen
    ? "translate-x-0 md:translate-x-0 md:w-56 lg:w-64 md:min-w-56 lg:min-w-64 md:pointer-events-auto"
    : "-translate-x-full md:translate-x-0 md:w-0 lg:w-0 md:min-w-0 lg:min-w-0 md:border-r-0 md:pointer-events-none";

  useEffect(() => {
    const runWarmups = () => warmupCriticalRoutes();

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(runWarmups);
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = setTimeout(runWarmups, 0);
    return () => clearTimeout(timerId);
  }, []);

  return (
    <>

      <aside className={`${menuClass} sidebar-menu fixed md:relative
      w-[290px]
      max-h-screen overflow-hidden bg-white/80 dark:bg-slate-900/70 border-r border-blue-200/60 dark:border-blue-300/10
        z-20 transition ease-in-out duration-500 `} >
        <div className="flex-1 flex items-center gap-3 text-blue-700 dark:text-blue-300 px-5 py-4 text-lg font-semibold tracking-wide border-b border-blue-200/60 dark:border-blue-300/10">
          <BrandMark
            className="text-blue-700 dark:text-blue-300"
            iconClassName="h-6 w-6"
            textClassName="text-3xl font-semibold tracking-wide"
          />
        </div>
        <nav className='my-2 mx-2 p-3 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 overflow-y-auto h-[calc(100vh-96px)]'>

          <ul className="flex flex-col gap-1 text-slate-700 dark:text-slate-200 text-sm" >
            <RenderMenuGroup isOpen={isOpen} setOpen={setOpen} />
          </ul>
        </nav>
      </aside>
      <div
        className={`md:hidden fixed inset-0 w-full h-full z-10 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      ></div>

    </>
  );
};



export default Sidebar
