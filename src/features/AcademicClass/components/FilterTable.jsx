import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { isBrowser } from 'react-device-detect';


import { IoMdAdd } from "react-icons/io";

import { TbFilterSearch } from "react-icons/tb";



import Breadcrumbs from '../../../components/Breadcrumbs';

import FormikFormModal from '@/components/form-components/FormikFormModal';
import { useFormModal } from '../../../contexts/FormModalProvider';
import Filter from './Filter';
export default function FilterTable({ data, columns, pageSize = 100, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], fetchedData, initialFilterValues }) {

    const [sorting, setSorting] = useState([])
    const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
            pagination: pagination,
            columnVisibility: {
                id: false //replace `id` with your column identifier
            }
        },
        manualPagination: false,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
    })

    useEffect(() => {
        setSearchParams(
            {
                page: table.getState().pagination.pageIndex + 1,
                limit: table.getState().pagination.pageSize,
            },

        )

    }, [pagination]);

    return (
        <div className='container-flex md-container'>
            <div className='row   flex flex-col md:flex-row justify-between gap-2 border-b-2 border-blue-300/10 pb-2 '>
                <div className='flex flex-col gap-2 flex-1 text-3xl'>
                    {/* {thisRoute} */}
                    <Breadcrumbs />

                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-start'>
                    <div className='flex flex-row gap-2 justify-center flex-1 items-center'>
                        <input
                            type='text'
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}
                            className='rounded-full py-0 text-sm px-4 m-0 border-blue-300/10  bg-transparent'
                            placeholder='Enter our search'
                        />
                        {
                            createRoute &&
                            <Link to={createRoute} title='Create new'
                                className="btn btn-primary btn-sm text-xl     btn-rounded-symbol border-blue-300/10    "><IoMdAdd /></Link>


                        }
                        {
                            createForm &&
                            <button onClick={() => setOpen(true)} title='Create new'
                                className="btn btn-primary btn-sm text-xl
                            btn-rounded-symbol border-blue-300/10"><IoMdAdd /></button>
                        }
                        {
                            isOpen &&
                            <>


                                <FormikFormModal label={createFormTitle ?? 'Create new'}>
                                    {createForm}
                                </FormikFormModal>



                            </>


                        }

                    </div>

                </div>
            </div>
            <div className={`flex`}>
                <Filter fetchedData={fetchedData} initialFilterValues={initialFilterValues} />
            </div>


            {isBrowser ?
                <div className="overflow-x-auto">

                    <table className="table table-zebra">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {
                                                        { asc: '🔼', desc: '🔽' }[
                                                        header.column.getIsSorted() ?? null
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {fetchedData.isFetching ?
                                <tr>
                                    <td colSpan={5} className="text-center bg-slate-600/30 ">
                                        <div className="flex justify-center items-center ">
                                            <div className="spinner  animate-spin border-violet-500 transition-colors   rounded-full h-6 w-6 border-t-2 border-b-
     "></div>
                                        </div>
                                    </td>
                                </tr> : <></>
                            }
                            {table.getRowModel().rows.map(row => (

                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (

                                        <td key={cell.id} >

                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                :
                <div className='flex gap-2 flex-col my-2'>
                    {table.getRowModel().rows.map((row) => (
                        <MobileRow row={row} index={row.id} key={row.id} mobileHeaders={mobileHeaders} />
                    ))}
                </div>
            }
            <div className='row  flex flex-col md:flex-row justify-between gap-2 mt-6'>
                <div className='flex flex-row gap-2 flex-1 text-lg'>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
                </div>
                <div className='flex flex-row gap-2 flex-1'>

                </div>
                <div className='flex flex-row gap-2 justify-end flex-1'>
                    <div className='flex flex-row  gap-2'>
                        <button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}
                            className='btn btn-blue btn-sm btn-rounded'>{'<<'}</button>
                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            className='btn btn-blue btn-sm btn-rounded'
                        >
                            {'<'}
                        </button>
                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            className='btn btn-blue btn-sm btn-rounded'
                        >
                            {'>'}
                        </button>
                        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
                            className='btn btn-blue btn-sm btn-rounded'>
                            {'>>'}
                        </button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export const FilterButton = ({ filter, showFilter, setShowFilter }) => {
    const handleSwitchFilter = () => {

        setShowFilter(prev => !prev)
    }
    return (
        <button onClick={handleSwitchFilter}
            className={`${filter ? '' : 'hidden'} btn btn-primary btn-sm text-xl     btn-rounded-symbol border-blue-300/10    `}>
            <TbFilterSearch />
        </button>


    )
}

export const MobileRow = ({ row, index, mobileHeaders }) => {
    const [checked, setChecked] = useState(false);
    if (index === 0) {
        setChecked(true)
    }
    return (

        <div key={row.id} className="collapse collapse-arrow bg-slate-800/0 border-b border-slate-600/70 rounded-none ">
            <input type="radio" name={`my-accordion-${index}`} checked={checked ? 'checked' : ''}
                onChange={() => setChecked(!checked)} className="accordion-checkbox  " />
            <div className="table-row-title collapse-title text-lg">
                {
                    row.getVisibleCells().map((cell, index) => (

                        mobileHeaders.includes(cell.column.columnDef.accessorKey)
                            ?
                            <MobileCell cell={cell} header={true} k={index} key={cell.id} mobileHeaders={mobileHeaders} />
                            :
                            null

                    ))}

            </div>
            <div className="collapse-content  ">
                {row.getVisibleCells().map((cell, index) => (
                    !mobileHeaders.includes(cell.column.columnDef.accessorKey)
                        ?
                        <MobileCell cell={cell} header={false} k={index} key={cell.id} />
                        :
                        null
                ))}
            </div>
        </div>



    )
}
export const MobileCell = ({ cell, header, k }) => {

    return (

        <div className={`flex ${k == 0 ? 'flex-col' : 'flex-row'} gap-2   `} key={k}  >
            <div className={` ${!header ? 'w-100 py-3 ' : 'w-100 py-1 '}`}>
                {cell.column.columnDef.header}  {':'}
            </div>
            <div className={`flex-1 ${!header ? 'py-3  border-b border-slate-800/50' : 'py-0 text-lg border-b border-slate-800/50'}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>

        </div>

    )

}