import { Menu, Transition } from '@headlessui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'

import { useTranslation } from 'react-i18next'
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
                <Menu.Button as='div' className=" rounded-full bg-primary p-2">
                    <HiDotsVertical />
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
                <Menu.Items className="absolute right-0 z-50 mt-2 px-4 w-36 origin-top-right rounded-md
                 bg-slate-800  ring-1 ring-black ring-opacity-5 focus:outline-none focus:shadow-outline shadow-sm shadow-blue-500">
                    <div className="py-1">
                        <div className='py-2  border-b-2 border-gray-400/30 text-xs'>
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
    const { t } = useTranslation()
    const [folderOption, setFolderOption] = useState({});
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
        <Menu.Item className="text-gray-100 overflow-hidden hover:bg-gray-600">
            {({ active }) => (

                <div onClick={handleMapperClick}
                    className={classNames(active ? 'bg-gray-100 text-gray-200' : 'text-gray-300', 'flex flex-nowrap items-center gap-4 cursor-pointer select-none   py-2 text-xs border-b-2 border-gray-500/20')}
                >  {option.original_name.split('.')[0]}
                </div>
            )}
        </Menu.Item>
    )
}