import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { NavLink, useLocation } from "react-router-dom";
import { menuGroup, page } from "../../Routes/navigation";
import { fetchUser } from "../../services";


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
  let menuClass = isOpen ? "fixed md:translate-x-0  md:sticky" : "-translate-x-full fixed md:translate-x-0";

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

      <aside className={`${menuClass} sidebar-menu  md:relative
      min-w-[350px] md:min-w-48 lg:min-w-56  
      max-h-[95dvh] ms-max-h-[95dvh] xl-max-h-[70dvh] 2xl:max-h-[96dvh]  overflow-hidden   bg-[#272e48]
        z-20 transition ease-in-out duration-500 `} >
        <div className="flex-1 flex items-center gap-5   text-teal-500   px-5 py-[.53rem] text-lg min-h-[6dvh] 2xl:min-h-[4dvh]">

          <FaBookOpenReader />
          {import.meta.env.VITE_APP_NAME}
        </div>
        <nav className='my-1 mx-2   p-4 rounded-lg bg-[#191d2d] overflow-y-auto  max-h-[85dvh] 2xl:max-h-[90dvh] '>

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
