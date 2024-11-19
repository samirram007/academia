import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link,  useSearchParams } from 'react-router-dom'




import { IoMdAdd } from "react-icons/io";

import { TbFilterSearch } from "react-icons/tb";

import Breadcrumbs from '../../../components/Breadcrumbs';
import PreviousClassFilter from './PreviousClassFilter.jsx';
import Promote from './Promote';
import { usePromotionContext } from '../context/usePromotionContext';


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

                    </div>

                </div>
            </div>
            <div className='flex flex-col  '>
                <PreviousClassFilter />
                {
                    <Promote table={table}  />

                }
            </div>


            {
                isErrorPreviousClassData
                    ? <div>{'No Data Found'}</div>
                    :
                       (
                        <div className="table-responsive overflow-y-auto  max-h-[42vh] 2xl:max-h-[60vh]">
                        <table className="table table-zebra overflow-y-scroll  bg-slate-800  scroll">
                            <thead className='sticky top-0 z-10'>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    className={header.column.columnDef.visible==false? 'hidden': 'py-0'}
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
                                {isFetchingPreviousClassData || isReFetchingPreviousClassData ?
                                <tr>
                                    <td colSpan={6} className="text-center bg-slate-600/30 ">
                                        <div className="flex justify-center items-center ">
                                            <div className="spinner  animate-spin border-violet-500 transition-colors rounded-full h-6 w-6 border-t-2 "></div>
                                        </div>
                                    </td>
                                </tr> : <></>
                            }
                                    {table.getRowModel().rows.map(row => (

                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (

                                                <td key={cell.id} className={cell.column.columnDef.visible==false? 'hidden': ''}>

                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>)


            }
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