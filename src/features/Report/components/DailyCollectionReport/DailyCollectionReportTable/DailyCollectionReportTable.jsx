import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


import { TbFilterSearch } from "react-icons/tb";

import Breadcrumbs from '../../../../../components/Breadcrumbs';
import { useCustomRoutes } from '../../../../../hooks';

import ExportToExcel from '../ExportToExcel/ExportToExcel';
import FilterHead from '../FilterHead/FilterHead';



export default function DailyCollectionReportTable({ data, columns, pageSize = 2000, fetchedData,
    mobileHeaders = ['id', 'name'], initialFilterValues }) {
    const thisRoute = useCustomRoutes()
    const [sorting, setSorting] = useState([])
    // const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('');

    const [searchParams, setSearchParams] = useSearchParams()
    const [rowSelection, setRowSelection] = useState({})

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: pageSize,
    })
    // const columnsMemo = useMemo(() => columns, [columns]);
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
            },
            rowSelection: rowSelection
        },
        manualPagination: false,
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,

    })



    return (
        <div className='container-flex md-container'>
            <div className='flex flex-col justify-between gap-2 pb-2 border-b-2 row md:flex-row border-blue-300/10 '>
                <div className='flex flex-col flex-1 gap-2 text-3xl'>
                    {/* {thisRoute} */}
                    <Breadcrumbs />

                </div>
                <div className='flex flex-row items-start justify-center flex-1 gap-2'>


                </div>
                <div className='flex flex-row items-start justify-center flex-1 gap-2'>
                    <div className='flex flex-row items-center justify-center flex-1 gap-2'>
                        <input
                            type='text'
                            value={filtering}
                            onChange={e => setFiltering(e.target.value)}
                            className='px-4 py-2 m-0 bg-transparent rounded-full border-blue-300/10'
                            placeholder='Enter our search'
                        />



                        <ExportToExcel table={table} />
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-start justify-start flex-1 gap-2'>
                <FilterHead fetchedData={fetchedData} initialFilterValues={initialFilterValues} />
            </div>



            <div className="table-responsive overflow-y-auto  max-h-[50vh] 2xl:max-h-[67vh]">
                <table className="table table-zebra overflow-scroll max-w-full  bg-slate-800  scroll">
                    <thead className='sticky top-0 z-10 bg-slate-900'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className={`py-4  bg-gray-900 ${header.column.columnDef.className || ''}`}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {
                                                    { asc: '🔼', desc: '🔽' }[
                                                    header.column.getIsSorted() ?? null
                                                    ]
                                                }
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {fetchedData.isFetching ?
                            <tr>
                                <td colSpan={13} className="text-center bg-slate-600/30 ">
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

                                    <td key={cell.id} className={` border-b-3 ${cell.column.columnDef.className || ''}`} >

                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    {/* <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className={`px-6 py-4 bg-gray-900 ${header.column.columnDef.className || ''}`}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.footer,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot> */}

                </table>
                <div className="sticky-footer" style={{
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'gray',
                    borderTop: '1px solid #ddd'
                }}>
                    <table className='table table-zebra overflow-scroll max-w-full  bg-slate-800  scroll'>
                        <tfoot className='sticky bottom-0 z-10 bg-slate-900'>
                            {table.getFooterGroups().map(footerGroup => (
                                <tr key={footerGroup.id}>
                                    {footerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className={` py-4 bg-gray-900 ${header.column.columnDef.className || ''}`}
                                        >
                                            {header.isPlaceholder ? null : (

                                                flexRender(
                                                    header.column.columnDef.footer,
                                                    header.getContext()
                                                )

                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>
                    </table>

                </div>
            </div>
            {/* Add Summary as total of each fees */}

        </div >

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

        <div key={row.id} className="border-b rounded-none collapse collapse-arrow bg-slate-800/0 border-slate-600/70 ">
            <input type="radio" name={`my-accordion-${index}`} checked={checked ? 'checked' : ''}
                onChange={() => setChecked(!checked)} className="accordion-checkbox " />
            <div className="text-lg table-row-title collapse-title">
                {
                    row.getVisibleCells().map((cell, index) => (

                        mobileHeaders.includes(cell.column.columnDef.accessorKey)
                            ?
                            <MobileCell cell={cell} header={true} k={index} key={cell.id} mobileHeaders={mobileHeaders} />
                            :
                            null

                    ))}

            </div>
            <div className="collapse-content ">
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