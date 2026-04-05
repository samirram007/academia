import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { isBrowser } from 'react-device-detect'
import { Link, useSearchParams } from 'react-router'
import { useCustomRoutes } from '../../hooks'


import { IoMdAdd } from "react-icons/io"
import { TbFilterSearch } from "react-icons/tb"
import Breadcrumbs from '../Breadcrumbs'
import FormikFormModal from '../form-components/FormikFormModal'

import { useFormModal } from '../../contexts/FormModalProvider'
export default function FilterTable({ data, columns, pageSize = 100, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], filter }) {
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
useEffect(()=>{

    if(filter){

        setShowFilter(prev=>true)

    }
},[])
    return (
        <div className='flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 px-5 py-4'>
                <div className='min-w-0'>
                    <Breadcrumbs />
                </div>
                <div className='flex items-center gap-2 shrink-0'>
                    <input
                        type='text'
                        value={filtering}
                        onChange={e => setFiltering(e.target.value)}
                        className='rounded-full py-1.5 text-sm px-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 w-44'
                        placeholder='Enter our search'
                    />
                    {createRoute &&
                        <Link to={createRoute} title='Create new'
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors">
                            <IoMdAdd />
                        </Link>
                    }
                    {createForm &&
                        <button onClick={() => setOpen(true)} title='Create new'
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors">
                            <IoMdAdd />
                        </button>
                    }
                    {isOpen &&
                        <FormikFormModal label={createFormTitle ?? 'Create new'}>
                            {createForm}
                        </FormikFormModal>
                    }
                    {filter && <FilterButton filter={filter} showFilter={showFilter} setShowFilter={setShowFilter} />}
                </div>
            </div>

            {/* Filter panel */}
            {filter && showFilter && (
                <div className='flex px-5 py-3 border-b border-slate-100 dark:border-slate-800'>
                    {filter}
                </div>
            )}

            {/* Table */}
            {isBrowser ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead className='bg-slate-100 dark:bg-slate-800'>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className='border-b border-slate-200 dark:border-slate-700'>
                                    {headerGroup.headers.map(header => {
                                        const align = header.column.columnDef.align;
                                        const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
                                        return (
                                        <th
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                                className={`px-4 py-3 ${alignClass} text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide cursor-pointer select-none`}
                                        >
                                            {header.isPlaceholder ? null : (
                                                    <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : ''}`}>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {({ asc: '↑', desc: '↓' })[header.column.getIsSorted() ?? null]}
                                                </div>
                                            )}
                                        </th>
                                        );
                                    })}
                                </tr>
                            ))}
                        </thead>
                        <tbody className='bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800'>
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className='hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors'>
                                    {row.getVisibleCells().map(cell => {
                                        const align = cell.column.columnDef.align;
                                        const alignClass = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
                                        return (
                                            <td key={cell.id} className={`px-4 py-3 text-slate-700 dark:text-slate-200 ${alignClass}`}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className='flex gap-2 flex-col my-2'>
                    {table.getRowModel().rows.map((row) => (
                        <MobileRow row={row} index={row.id} key={row.id} mobileHeaders={mobileHeaders} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className='flex flex-col md:flex-row justify-between gap-2 px-5 py-4 border-t border-slate-100 dark:border-slate-800'>
                <div className='flex-1 text-sm text-slate-500 dark:text-slate-400'>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
                </div>
                <div className='flex flex-row gap-1.5 justify-end flex-1'>
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>{'<<'}</button>
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>{'<'}</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>{'>'}</button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        className='inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'>{'>>'}</button>
                </div>
            </div>
        </div>
    )
}

export const FilterButton = ({ filter, showFilter, setShowFilter }) => {
    if (!filter) return null;
    return (
        <button onClick={() => setShowFilter(prev => !prev)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 text-lg transition-colors shrink-0">
            <TbFilterSearch />
        </button>
    );
}

export const MobileRow = ({ row, index, mobileHeaders }) => {
    const [open, setOpen] = useState(false);
    return (
        <div key={row.id} className="border-b border-slate-200 dark:border-slate-700">
            <button type="button" onClick={() => setOpen(prev => !prev)}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                <div className="flex items-center gap-2">
                    {row.getVisibleCells().map((cell, i) =>
                        mobileHeaders.includes(cell.column.columnDef.accessorKey)
                            ? <MobileCell cell={cell} header={true} k={i} key={cell.id} />
                            : null
                    )}
                </div>
                <span className='text-slate-400'>{open ? '↑' : '↓'}</span>
            </button>
            {open && (
                <div className="px-3 pb-3 flex flex-col gap-1 bg-slate-50 dark:bg-slate-800/30">
                    {row.getVisibleCells().map((cell, i) =>
                        !mobileHeaders.includes(cell.column.columnDef.accessorKey)
                            ? <MobileCell cell={cell} header={false} k={i} key={cell.id} />
                            : null
                    )}
                </div>
            )}
        </div>
    );
}

export const MobileCell = ({ cell, header, k }) => {
    return (
        <div className={`flex ${k === 0 ? 'flex-col' : 'flex-row'} gap-1`} key={k}>
            <div className={`text-xs text-slate-500 dark:text-slate-400 ${!header ? 'py-1' : ''}`}>
                {cell.column.columnDef.header}:
            </div>
            <div className={`flex-1 text-sm ${!header ? 'py-1 border-b border-slate-100 dark:border-slate-800' : ''}`}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
        </div>
    );
}