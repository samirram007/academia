import { Menu, Transition } from '@headlessui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

import { HiArrowLongDown } from "react-icons/hi2"
import { Flip, toast } from 'react-toastify'
import { fetchDocuments, folderImageMapperFn } from '../services/apis'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function ImageToFolderBtn({ document }) {

    const { data, isError, isFetching } = useQuery({
        queryKey: ['documents'],
        queryFn: fetchDocuments,
        refetchOnWindowFocus: false,
        retry: 2,
        staleTime: 1000 * 60
    });


    const folders = data?.data.filter(doc => doc.document_type === 'folder')
    //.map(doc => {...doc,doc.original_name.split('.')[0]);




    return (
        <Menu as="div" className="relative inline-block text-left  ">
            <div>
                <Menu.Button as='button' className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white/90 p-1.5 text-slate-500 shadow-sm transition-colors hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:text-blue-400">
                    <HiDotsVertical className='size-5' />
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
                <Menu.Items className="absolute right-0 z-50 mt-2 px-4 w-40 origin-top-right rounded-md border border-slate-200 bg-white ring-1 ring-black/5 focus:outline-none shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:shadow-blue-500/30">
                    <div className="py-1">
                        <div className='py-2 border-b border-slate-200 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-200'>
                            <span className='flex font-extrabold '>Move To <HiArrowLongDown className='text-xl' /></span>
                        </div>
                        {folders && folders.map((option, index) => (
                            <MenuItem option={option} document={document} key={index} />
                        ))
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

const MenuItem = ({ option, document }) => {
    const [payload, setPayload] = useState({
        folder_id: option.id,
        document_id: document.id,
    })
    const folderImageMapper = useMutation({
        mutationFn: folderImageMapperFn,
        onSuccess: (data) => {
            toast.info("Added", { transition: Flip });

        },
        onError: (error) => {
            toast.error("Error", { transition: Flip });

        },
    });
    const handleMapperClick = () => {
        folderImageMapper.mutate(payload)
    }
    return (
        <Menu.Item className="overflow-hidden">
            {({ active }) => (

                <div onClick={handleMapperClick}
                    className={classNames(active ? 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100' : 'text-slate-700 dark:text-slate-200', 'flex flex-nowrap items-center gap-4 cursor-pointer select-none py-2 text-xs border-b border-slate-200/70 dark:border-slate-700/70')}
                >  {option.original_name.split('.')[0]}
                </div>
            )}
        </Menu.Item>
    )
}