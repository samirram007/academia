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




import { useCustomRoutes } from '../../../hooks';

import Breadcrumbs from '../../../components/Breadcrumbs';

import FormikFormModal from '@/components/form-components/FormikFormModal';
import { useFormModal } from '../../../contexts/FormModalProvider';
import Filter from './Filter';
export default function ExpenseTable({ data, columns, pageSize=100 , createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], ExpenseData, initialFilterValues }) {
    const thisRoute = useCustomRoutes()
    const [sorting, setSorting] = useState([])
    const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('')
    const [filterReady, setFilterReady] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [showFilter, setShowFilter] = useState(true)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize:  pageSize,
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            sorting: [{ id: "id", desc: true }], // Default sorting on "id" in descending order
        },
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
    // console.log(ExpenseData)

    useEffect(() => {
        setSearchParams(
            {
                page: table.getState().pagination.pageIndex + 1,
                limit: table.getState().pagination.pageSize,
            },

        )

    }, [pagination]);
    if (ExpenseData.isLoading && !ExpenseData.data) return <div className='px-5 py-6 text-slate-500 dark:text-slate-400'>Loading...</div>
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 px-5 py-4'>
                <div className='min-w-0'>
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row justify-start  items-center gap-2 shrink-0'>

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
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors"><IoMdAdd /></button>
                        }
                        {
                            isOpen &&
                            <>


                                <FormikFormModal size={'full'} label={createFormTitle ?? 'Create new'}>
                                    {createForm}
                                </FormikFormModal>



                            </>


                        }
                        {/* { <FilterButton
                            filter={filter}
                            showFilter={showFilter}
                            setShowFilter={setShowFilter} />
                            } */}
                </div>
            </div>
            {/* <div className={`${( !showFilter) ? 'hidden' : 'flex  '}`}>
                {filter &&  filter}
            </div> */}
            <div className='px-5 py-3 border-b border-slate-100 dark:border-slate-800'>
            <Filter
                    setFilterReady={setFilterReady}
                    ExpenseData={ExpenseData}
                    initialFilterValues={initialFilterValues}
                />
            </div>

            {isBrowser ?
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className='bg-slate-100 dark:bg-slate-800'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className='border-b border-slate-200 dark:border-slate-700'>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className='px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide cursor-pointer select-none'
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

                        <tbody className='bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800'>
                            {table.getRowModel().rows.map(row => (

                                <tr key={row.id} className='hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors'>
                                    {row.getVisibleCells().map(cell => (

                                        <td key={cell.id} className='px-4 py-3 text-slate-700 dark:text-slate-200'>

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
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-3 px-2 py-3 border-t border-slate-100 dark:border-slate-800'>
                <div className='flex flex-row gap-2 flex-1 text-sm text-slate-500 dark:text-slate-400'>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
                </div>
                <div className='flex flex-row gap-2 flex-1 justify-end text-sm text-slate-600 dark:text-slate-300'>
                Total: { table.getRowModel().rows.reduce((total,x)=>total+parseFloat(x.original.total_amount),0)}
                </div>
                {/* <div className='flex flex-row gap-2  justify-end w-[200px]'>    </div> */}
                <div className='flex flex-row gap-2 justify-end'>
                    <div className='flex flex-row gap-1.5'>
                        <button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}
                            className='inline-flex items-center justify-center min-w-10 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'>{'<<'}</button>
                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            className='inline-flex items-center justify-center min-w-10 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                        >
                            {'<'}
                        </button>
                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            className='inline-flex items-center justify-center min-w-10 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'
                        >
                            {'>'}
                        </button>
                        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}
                            className='inline-flex items-center justify-center min-w-10 h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'>
                            {'>>'}
                        </button>
                    </div>
                </div>
            </div>

        </div>

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