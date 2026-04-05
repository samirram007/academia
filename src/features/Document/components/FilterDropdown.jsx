import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { CiFolderOn } from 'react-icons/ci'
import { ImFilePdf } from 'react-icons/im'
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
        setFilteredOption(opt)
         localStorage.imageFilter=opt.title
         filterFn(opt.title)
    }


    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-blue-500/30 dark:bg-blue-600 dark:hover:bg-blue-500">
                    <span className="text-base">{filteredOption.icon}</span>
                    <span>{filteredOption.title}</span>
                    <ChevronDownIcon className="h-4 w-4 text-white/90" aria-hidden="true" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md border border-slate-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-slate-700 dark:bg-slate-800">
                    <div className="py-1">
                        {filterOptions && filterOptions.map((option, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (

                                            <div
                                        className={classNames(active ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200', 'flex flex-nowrap items-center gap-2 cursor-pointer px-4 py-2 text-sm')}
                                            onClick={()=>handleFilterClick(option)}>
                                        <span className='text-base'>{option.icon}</span>
                                        <span>{option.title}</span>

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
