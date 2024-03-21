import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { CiEdit, CiFolderOn, CiImageOn } from 'react-icons/ci'
import { ImFilePdf } from 'react-icons/im'
import { AiOutlineFileImage } from 'react-icons/ai'
import { BsImageFill } from 'react-icons/bs'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const filterOptions = [
    { title: "All", icon: <CiFolderOn /> },
    { title: "Folder", icon: <CiFolderOn /> },
    { title: "Image", icon: <BsImageFill /> },
    { title: "PDF", icon: <ImFilePdf /> },

    // "Audio","Video","PDF","Word","Excel","PowerPoint","Text","Zip","Archive","Other"
]
export default function FilterDropDown({filterFn}) {


    const [filteredOption, setFilteredOption] = useState(
        localStorage.imageFilter ? {...filterOptions.filter(x=>x.title==localStorage.imageFilter)[0]}  : filterOptions[0]
    )
    const handleFilterClick=(opt)=>{

         setFilteredOption(prev=>prev.filteredOption=opt)
         localStorage.imageFilter=opt.title
         filterFn(opt.title)
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="btn btn-primary btn-sm      ">
                    {filteredOption.icon}
                    {filteredOption.title}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-slate-900" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md
                 bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {filterOptions && filterOptions.map((option, index) => (
                            <Menu.Item key={index} className="text-gray-100 hover:bg-gray-600">
                                {({ active }) => (

                                            <div
                                            className={classNames(active ? 'bg-gray-100 text-gray-200' : 'text-gray-300', 'flex flex-nowrap items-center gap-4 cursor-pointer px-4 py-2 text-md')}
                                            onClick={()=>handleFilterClick(option)}>
                                                {option.icon ?? <MdOutlineDashboard />}{option.title}

                                            </div>
                                )}
                            </Menu.Item>))
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
