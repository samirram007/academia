import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { isBrowser } from 'react-device-detect';


import { IoMdAdd } from "react-icons/io";

import { TbFilterSearch } from "react-icons/tb";

import Breadcrumbs from '@/components/Breadcrumbs';
import FormikFormModal from '@/components/form-components/FormikFormModal';
import { useFormModal } from '../../../contexts/FormModalProvider';
import { useCustomRoutes } from '../../../hooks';


export default function FilterTable({ data, columns, pageSize = 100, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], filter, fetchedData }) {
    const thisRoute = useCustomRoutes()
    const [sorting, setSorting] = useState([])
    const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [showFilter, setShowFilter] = useState(true)
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
    useEffect(() => {

        if (filter) {

            setShowFilter(prev => true)

        }
    }, [])
    return (
        <div className='flex flex-col text-slate-800 dark:text-slate-100'>
            <div className='flex items-center justify-between gap-4 border-b border-blue-200/70 dark:border-blue-300/10 px-5 py-4'>
                <div className='min-w-0'>
                    <Breadcrumbs />
                </div>
                <div className='flex items-center gap-2 shrink-0'>
                        <input
                            type='text'
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}
                        className='input input-sm input-bordered w-full max-w-xs'
                            placeholder='Enter your search'
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
                        {<FilterButton
                            filter={filter}
                            showFilter={showFilter}
                            setShowFilter={setShowFilter} />
                    }
                </div>
            </div>
            {filter && showFilter && (
                <div className='px-5 py-3 border-b border-blue-100/70 dark:border-blue-300/10'>
                    {filter}
                </div>
            )}


            {isBrowser ?
                <div className="table-responsive overflow-y-auto rounded-xl border border-blue-200/70 dark:border-blue-300/10 
                max-h-[50vh] md:max-h-[50vh] lg:max-h-[50vh] xl:max-h-[60vh] 2xl:max-h-[67vh]">
                    <table className="table table-zebra overflow-y-scroll bg-white dark:bg-slate-900 scroll">
                        <thead className='sticky top-0 z-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'>
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

                        <tbody className=''>
                            {fetchedData.isFetching ?
                                <tr>
                                    <td colSpan={columns.length} className="text-center bg-slate-100 dark:bg-slate-800/40 py-8">
                                        <div className="flex justify-center items-center ">
                                            <div className="animate-spin transition-colors rounded-full h-7 w-7 border-2 border-slate-300 dark:border-slate-600 border-t-blue-500 dark:border-t-blue-400"></div>
                                        </div>
                                    </td>
                                </tr> : <></>
                            }
                            {!fetchedData.isFetching && table.getRowModel().rows.length === 0 ?
                                <tr>
                                    <td colSpan={columns.length} className="text-center text-slate-500 dark:text-slate-400 py-6 bg-white dark:bg-slate-900">
                                        No data found for selected filters.
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
            <div className='flex flex-col md:flex-row justify-between gap-2 mt-4'>
                {/* <div className='flex flex-row gap-2 flex-1 text-lg'>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
                </div> */}
                <div className='flex flex-row gap-2 flex-1 text-base md:text-lg text-slate-700 dark:text-slate-200'>
                    No. of records: {table.getRowCount()}
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