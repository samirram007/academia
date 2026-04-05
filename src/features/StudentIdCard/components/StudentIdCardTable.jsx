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



import { IoMdAdd } from "react-icons/io";

import { TbFilterSearch } from "react-icons/tb";

import Breadcrumbs from '@/components/Breadcrumbs';
import FormikFormModal from '@/components/form-components/FormikFormModal';
import { DateTime } from 'luxon';
import { useFormModal } from '../../../contexts/FormModalProvider';
import { useCustomRoutes } from '../../../hooks';
import Filter from './Filter';
import PrintModal from './PrintModal';


export default function StudentIdCardTable({ data, columns, pageSize = 100, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], StudentIdCardData, initialFilterValues }) {
    const thisRoute = useCustomRoutes()
    const [sorting, setSorting] = useState([])
    const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [rowSelection, setRowSelection] = useState({})
    const [filterReady, setFilterReady] = useState(true)
    const [selectedItems, setSelectedItems] = useState(0)
    const [printQueue, setPrintQueue] = useState(null)

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
            },
            rowSelection: rowSelection
        },
        manualPagination: false,

        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onPaginationChange: setPagination,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: row => row.original.selectedStudentSession.is_promoted ? false : true
    })
    const addToPrintQueue = () => {

        // setPrintQueue(prev=>[ table.getSelectedRowModel().rows.map(items=>items.original)])
        // console.log(printQueue.filter(x=>newData.map(t=>t.id).includes(!x.id)));
        const newData = table.getSelectedRowModel().rows.map(items => items.original)
        const oldData = printQueue && printQueue.filter(x => !newData.map(t => t.id).includes(x.id))
        //  setPrintQueue(prev=>[...newData])
        //setPrintQueue(prev=>[...oldData,...newData])
        if (oldData) {
            setPrintQueue(prev => [...oldData, ...newData])
        }
        else {
            setPrintQueue(prev => [...newData])
        }
        // console.log(oldData)

        // console.log(table.getSelectedRowModel().rows.map(items=>items.original))
    }
    useEffect(() => {

    }, [printQueue])
    useEffect(() => {
        setSearchParams(
            {
                page: table.getState().pagination.pageIndex + 1,
                limit: table.getState().pagination.pageSize,
            },

        )

    }, [pagination]);
    useEffect(() => {
        setSelectedItems(prev => table.getSelectedRowModel().flatRows.length)
    }, [table.getSelectedRowModel().flatRows.length]);
    return (
        <div className='flex flex-col'>
            <div className='flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700/60 px-5 py-4'>
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
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg transition-colors"><IoMdAdd /></button>
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
            <div className='px-5 py-3 border-b border-slate-100 dark:border-slate-800'>
                <Filter
                    setFilterReady={setFilterReady}
                    StudentIdCardData={StudentIdCardData}
                    initialFilterValues={initialFilterValues}
                />
                {
                    //  <Promote StudentIdCardData={data} table={table} initialFilterValues={{ ...initialFilterValues }} />
                    // table.getSelectedRowModel().flatRows.length ?
                    //      <Promote StudentIdCardData={data} table={table} />:''
                    //
                }
            </div>
            {/* <div>

                <ul>
                    {table.getSelectedRowModel().flatRows.map((element, index) => {
                        // element.original.selectedStudentSession.is_promoted=true
                        // console.log(element.original)
                        return <li key={index}> {element.original.name}</li>
                    })}
                </ul>

            </div> */}
            {
                filterReady &&
                <div className='px-5 py-3'>
                    {/* {console.log(StudentIdCardData)} */}
                    {(!StudentIdCardData.data || StudentIdCardData.isError || StudentIdCardData.data.data.length === 0)
                            ? <div className='p-4 flex justify-center items-center text-lg text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-lg h-32 border border-slate-200 dark:border-slate-700/60'>
                            No Data Found
                        </div>
                        :
                        <>
                                <div className='flex flex-col md:flex-row justify-between bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-lg text-slate-700 dark:text-slate-200 items-start md:items-center px-4 py-2 gap-2'>

                                <div>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <div key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <div
                                                    key={header.id}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <div>
                                                            {
                                                                header.column.columnDef.accessorKey === 'is_promoted' &&
                                                                flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )
                                                            }

                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                <div className='flex flex-row gap-1 items-center  '>
                                        <div className="inline-flex items-center rounded-full border border-emerald-400/60 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 text-xs font-semibold">{selectedItems} selected</div>
                                        <button className='inline-flex items-center rounded-full border border-blue-500 text-blue-600 dark:text-blue-400 px-3 py-1.5 text-xs font-semibold hover:bg-blue-600 hover:text-white transition-colors'
                                        onClick={() => addToPrintQueue()}
                                        >
                                            Add to print queue
                                    </button>
                                    <PrintModal printQueue={printQueue} />

                                </div>
                            </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-3'>
                                {table.getRowModel().rows.map((row, index) => (
                                    <IdCard row={row} index={row.id} key={index} mobileHeaders={mobileHeaders} />
                                ))}
                            </div>
                        </>
                    }
                </div>
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
export const IdCard = ({ row }) => {

    //   console.log("cell",import.meta.env.VITE_API_BASE_URL);
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const data = row.original
    // console.log("cell",data.selectedStudentSession);
    return (

        <div className={`w-[230px] h-[300px] bg-slate-300
        flex  flex-row flex-wrap gap-2  py-0 text-lg border-b
         border-slate-800/50 rounded-xl text-slate-900 `}   >

            <div className={`relative flex-1 p-3 flex flex-col justify-start items-center `}>
                {
                    row.getVisibleCells().map((cell, index) => (


                        <MobileCell cell={cell} header={true} key={cell.id} />


                    ))}


                <div className='relative'>
                    <div className=' w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>

                        {
                            data.profile_document ?
                                <img src={data.profile_document.path} className='w-full h-full' /> :
                                <img src={`${baseUrl}/storage/documents/student.png`} className='w-full h-full' alt="" />

                        }
                    </div>
                </div>
                <div>
                    <div>Name: {data.name}</div>
                    <div>Dob: {DateTime.fromISO(data.dob).toLocaleString(DateTime.DATE_MED)}</div>
                    <div>Session: {data.selectedStudentSession.academic_session.session}</div>
                    <div>Campus: {data.selectedStudentSession.campus.name}</div>

                    <div>Class: {data.selectedStudentSession.academic_class.name}</div>
                    <div>Section: {data.selectedStudentSession.section.name}</div>
                    <div>Roll No.: {data.selectedStudentSession.roll_no}</div>
                </div>

            </div>

        </div>

    )
}
export const IdCardCell = ({ cell }) => {

    // console.log("cell", import.meta.env.VITE_API_BASE_URL);
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const data = cell.row.original
    return (

        <div className={`w-[230px] h-[300px] bg-slate-300
        flex  flex-row flex-wrap gap-2  py-0 text-lg border-b
         border-slate-800/50 rounded-xl text-slate-900 `}   >

            <div className={`p-3 `}>
                {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                <div className='relative'>

                    <div className=' w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>

                        {
                            data.profile_document ?
                                <img src={baseUrl + data.profile_document.path} className='w-full h-full' /> :
                                <img src={`${baseUrl}/storage/documents/student.png`} className='w-full h-full' alt="" />

                        }
                    </div>
                </div>
                <div>Name: {data.profile_document && data.profile_document.path}</div>
                <div>Name: {data.name}</div>
                <div>Dob: {data.dob}</div>
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

        <div className={`absolute flex flex-start left-2   gap-2   `}   >

            <div className={`flex-1  `}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>

        </div>

    )

}