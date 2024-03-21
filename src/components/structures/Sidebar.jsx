import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../services";
import { menuGroup, page } from "../../Routes/navigation";


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

  return (
    page.map(({ path, name, element, children, icon, isMenu, menuGroup }, i) => {

      if (!isMenu) return

      if (!children && menuGroup == menuGroupData.name) {
        return (
          <li className={`flex flex-row gap-2 items-center min-h-[1rem] ${menuGroupData.visible ? 'pl-4' : ''} `} key={i}    >
            {icon ?? <MdOutlineDashboard />}
            <NavLink to={`/${path}`} className=" ">
              {name}
            </NavLink>
          </li>
        )
      }


      if (children && menuGroup == menuGroupData.name)

        if (children.filter(x => x.isMenu).length == 0) {
          return (
            <li className={`flex flex-row gap-2 items-center min-h-[1rem] ${menuGroupData.visible ? 'pl-4' : ''} `} key={i}    >
              {icon ?? <MdOutlineDashboard />}
              <NavLink to={`/${path}`} className=" ">
                {name}
              </NavLink>
            </li>
          )
        }
        else {
          return (
            <li key={i} className={`collapse collapse-arrow collapse-menu w-full ${menuGroupData.visible ? 'pl-4' : ''}  `}>
              <input type="radio" name={`my-menu-1`} className="accordion-checkbox" />
              <div className="flex flex-row gap-2 items-center  collapse-title collapse-title-custom ">{icon ?? <MdOutlineDashboard />}{name}</div>
              <ul key={i} className="pl-4 collapse-content flex flex-col gap-3"  >
                <li className="flex flex-row gap-2 items-center min-h-[1rem] " key={i}   >
                  <TfiLayoutListThumb />
                  <NavLink to={`/${path}`} onClick={() => setOpen(!isOpen)} className={`w-full  h-full ${checkActive(path) ? "text-blue-500 " : ""} `} >
                    {name}
                  </NavLink>
                </li>
                {children.map((item, j) => {
                  if (!item.isMenu) return
                  return <li className="flex flex-row gap-2 items-center min-h-[1rem]" key={j} path={`/>${item.path}`}   >
                    {item.icon ?? <MdOutlineDashboard />}
                    <NavLink to={`/${path}/${item.path}`} onClick={() => setOpen(!isOpen)} className={`w-full  h-full ${checkActive(path + item.path) ? "text-blue-500 " : ""} `}>
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
  let menuClass = isOpen ? "md:translate-x-0" : "-translate-x-full md:translate-x-0";

  const authUser = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: Infinity
  })
  if (authUser.isLoading) {
    return (<Loader />)
  }
  return (
    <>

      <aside className={`${menuClass} sidebar-menu fixed md:relative w-[350px] md:w-72  h-screen bg-[#272e48]
        z-20 transition ease-in-out duration-500 overflow-y-auto`} >
        <div className="flex-1 flex items-center gap-5   text-teal-500   px-5 py-[.53rem] text-lg min-h-[4rem]">

          <FaBookOpenReader />
          {import.meta.env.VITE_APP_NAME}
        </div>
        <nav className='my-4 mx-2   p-4 rounded-lg bg-[#191d2d]'>

          <ul className="flex flex-col gap-2" >
            <RenderMenuGroup isOpen={isOpen} setOpen={setOpen} />
          </ul>
        </nav>
      </aside>
      <div className={`${menuClass} md:hidden   fixed inset-0 w-full h-full z-10 bg-black/50`} onClick={() => setOpen(!isOpen)}></div>

    </>
  );
};



export default Sidebar
