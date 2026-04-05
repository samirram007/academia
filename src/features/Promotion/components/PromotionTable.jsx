import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';




import { IoMdAdd } from "react-icons/io";

import { TbFilterSearch } from "react-icons/tb";

import Breadcrumbs from '../../../components/Breadcrumbs';
import { usePromotionContext } from '../context/usePromotionContext';
import PreviousClassFilter from './PreviousClassFilter.jsx';
import Promote from './Promote';


export default function PromotionTable({   columns, pageSize = 100, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'] }) {

        const {
            previousClassData,
            xData,
            isFetchingPreviousClassData,
            isReFetchingPreviousClassData,
            isErrorPreviousClassData,
            refetch,
            initialValues,
            initialFilterValues
        } = usePromotionContext();
    const [sorting, setSorting] = useState([])

    const [filtering, setFiltering] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [rowSelection, setRowSelection] = useState({})

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    const table = useReactTable({
        data:xData,
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
            },
            rowSelection: rowSelection
        },
        manualPagination: false,

        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: row => row.original.student_sessions[0].is_promoted ? false : true
    })

    // useEffect(() => {
    //     setSearchParams(
    //         {
    //             page: table.getState().pagination.pageIndex + 1,
    //             limit: table.getState().pagination.pageSize,
    //         },

    //     )

    // }, [pagination]);

    return (
        <div className='flex flex-col gap-2'>
            {/* Header row */}
            <div className='flex flex-col md:flex-row justify-between gap-2 border-b border-slate-200 dark:border-blue-300/10 pb-2'>
                <div className='flex flex-col gap-2 flex-1'>
                    <Breadcrumbs />
                </div>
                <div className='flex flex-row gap-2 justify-center flex-1 items-center'>
                    <input
                        type='text'
                        value={filtering}
                        onChange={e => setFiltering(e.target.value)}
                        className='rounded-full py-1.5 text-sm px-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 w-full max-w-xs'
                        placeholder='Enter your search'
                    />
                    {createRoute &&
                        <Link to={createRoute} title='Create new'
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors">
                            <IoMdAdd />
                        </Link>
                    }
                </div>
            </div>

            {/* Filters + Promotion setup */}
            <div className='flex flex-col gap-2'>
                <PreviousClassFilter />
                <Promote table={table} />
            </div>

            {/* Table */}
            {isErrorPreviousClassData
                ? <div className='text-slate-500 dark:text-slate-400 text-center py-6'>No Data Found</div>
                : (
                    <div className="overflow-y-auto max-h-[42vh] 2xl:max-h-[60vh] rounded-lg border border-slate-200 dark:border-slate-700">
                        <table className="w-full text-sm border-collapse">
                            <thead className='sticky top-0 z-10 bg-slate-100 dark:bg-slate-800'>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className='border-b border-slate-200 dark:border-slate-700'>
                                        {headerGroup.headers.map(header => (
                                            <th
                                                key={header.id}
                                                onClick={header.column.getToggleSortingHandler()}
                                                className={`${header.column.columnDef.visible === false ? 'hidden' : ''} px-3 py-2.5 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide cursor-pointer select-none`}
                                            >
                                                {header.isPlaceholder ? null : (
                                                    <div className='flex items-center gap-1'>
                                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                                        {({ asc: '↑', desc: '↓' })[header.column.getIsSorted() ?? null]}
                                                    </div>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className='bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800'>
                                {(isFetchingPreviousClassData || isReFetchingPreviousClassData) && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-6">
                                            <div className="flex justify-center items-center gap-2 text-slate-500 dark:text-slate-400">
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500"></div>
                                                <span className='text-xs'>Loading...</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className='hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors'>
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className={`${cell.column.columnDef.visible === false ? 'hidden' : ''} px-3 py-2.5 text-slate-700 dark:text-slate-200`}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export const FilterButton = ({ filter, showFilter, setShowFilter }) => {
    if (!filter) return null;
    return (
        <button onClick={() => setShowFilter(prev => !prev)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors">
            <TbFilterSearch />
        </button>
    );
}

export const MobileRow = ({ row, index, mobileHeaders }) => {
    const [checked, setChecked] = useState(false);
    return (
        <div key={row.id} className="border-b border-slate-200 dark:border-slate-700">
            <button
                type="button"
                onClick={() => setChecked(prev => !prev)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    {row.getVisibleCells().map((cell, i) =>
                        mobileHeaders.includes(cell.column.columnDef.accessorKey)
                            ? <MobileCell cell={cell} header={true} k={i} key={cell.id} mobileHeaders={mobileHeaders} />
                            : null
                    )}
                </div>
                <span className="text-slate-400">{checked ? '↑' : '↓'}</span>
            </button>
            {checked && (
                <div className="px-3 pb-3 flex flex-col gap-1">
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