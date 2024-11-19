import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { lazy, useEffect, useState, } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiPrinterLine } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import { useFormModal } from '../../../contexts/FormModalProvider';
import { useCustomRoutes } from '../../../hooks';
import { PrintModal } from '../FeeProcess/print/PrintToPdf';


const Filter = lazy(() => import('./Filter'))
const EditFees = lazy(() => import('../FeeProcess/EditFees'))
// const PrintToPdf=lazy(()=>import('./print/PrintToPdf'))
const FormikEditFormModal = lazy(() => import('@/components/form-components/FormikEditFormModal'))
const FormikFormModal = lazy(() => import('@/components/form-components/FormikFormModal'))
const Breadcrumbs = lazy(() => import('@/components/Breadcrumbs'))
export default function FeeTable({ data, columns, pageSize = 2000, createRoute,
    createForm, createFormTitle,
    mobileHeaders = ['id', 'name'], FeeData, initialFilterValues }) {
    const thisRoute = useCustomRoutes()
    const [sorting, setSorting] = useState([])
    const { isOpen, setOpen } = useFormModal()
    const [filtering, setFiltering] = useState('')
    const [filterReady, setFilterReady] = useState(true)
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
    // console.log(FeeData)

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

            <Filter
                setFilterReady={setFilterReady}
                FeeData={FeeData}
                initialFilterValues={initialFilterValues}
            />

            {
                filterReady &&
                <div>
                        {FeeData.isFetching ?

                            <div className="flex justify-center items-center ">
                                <div className="spinner  animate-spin border-violet-500 transition-colors rounded-full h-6 w-6 border-t-2 "></div>
                            </div>
                            : <></>
                        }
                    {
                        (!FeeData.data || FeeData.isError || FeeData.data.data.length === 0)
                            ? <div className='p-4 flex justify-center items-center text-2xl bg-slate-600 mt-4 rounded-lg h-40'>
                                No Data Found
                            </div>
                            :
                            <>
                                    <div className='flex flex-row justify-center  rounded-lg text-slate-200 items-center  px-4'>

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

                                    </div>
                                        <div className='relative w-[100%] max-h-[55dvh] 2xl:max-h-[70dvh] overflow-y-auto overflow-x-hidden pb-2 flex gap-2 flex-col flex-nowrap justify-between my-2'>
                                        {table.getRowModel().rows.map((row, index) => (
                                            <FeeCard row={row} index={row.id} key={index} />
                                        ))}
                                            <div className="fixed bottom-0 left-0 right-0 bg-violet-600  rounded-lg flex flex-row justify-center ">
                                            <div className='flex flex-row flex-nowrap text-4xl/[12px]
                                        py-2 px-16 w-full'>
                                                    <div className="">No. of Record(s): </div>
                                                    <div>{table.getRowModel().rows.length}</div>
                                                    <div className='flex-1 text-right pr-4'>Total: </div>
                                                    <div className='pr-2'>
                                                        {

                                                            table.getRowModel().rows.reduce((total, x) => total + parseFloat(x.original.total_amount), 0).toFixed(2)
                                                        }
                                                    </div>
                                                </div>
                                        </div>

                                    </div>

                                </div>
                            </>
                    }
                </div>
            }

        </div>

    )
}
export const FeeCard = ({ row, index }) => {

    const data = row.original
    return (
        <div className='flex w-100 flex-row flex-nowrap bg-blue-600/10 p-2 rounded-lg gap-2'>
            <div className='flex flex-col gap-2 w-1/2'>
                <div className='badge badge-success'>
                    <span className='w-16'>Fee No:</span>  <span>{data.fee_no}</span>
                </div>
                <div>

                    <div className='px-2'>
                        <span className='w-16'>Date: </span>{DateTime.fromISO(data.fee_date).toLocaleString(DateTime.DATE_MED)}
                    </div>
                    <div className='px-2'>
                        <span className='w-16'>Campus: </span><span>{data.student_session.campus.name}</span>
                    </div>
                    <div className='px-2'>
                        <span className='w-16'>Session: </span><span>{data.student_session.academic_session.session}</span>
                    </div>
                    <div className='px-2'>
                        <span>Student: </span><span className="font-bold text-green-500">{data.student.name}</span>
                    </div>
                    <div className='px-2'>

                        <div className='flex flex-row flex-nowrap gap-2'>
                            <span  >

                                <span className='text-red-300'>{data.student_session.academic_class.name}</span>
                            </span>
                            <span  >
                                <span>Section: </span>
                                <span className='text-blue-400'>{data.student_session.section.name}</span>
                            </span>
                            <span   >
                                <span>Roll No: </span>
                                <span className='text-yellow-300'>{data.student_session.roll_no}</span>
                            </span >

                        </div>

                    </div>

                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/2 border-2 border-primary rounded-lg'>
                <FeeDetails data={data} />
            </div>

        </div >
    )
}
export const FeeDetails = ({ data }) => {

    return (
        <div className='p-2 text-[8px]'>
            <div className='flex flex-row flex-nowrap justify-between items-center
        gap-1   border-b m-0  pb-1'>
                <div className=' flex-1 pr-4'>{'...'}</div>
                <div className='relative flex flex-row flex-nowrap gap-2'>
                    <PrintToPdf fees={data}
                        session_id={data.student_session.academic_session_id} />
                    <FeeItems fees={data} selectedStudentSession={data.student_session} />

                </div>
            </div>
            <div className='flex flex-row flex-nowrap justify-between items-center
        gap-1   border-b mb-1 bg-slate-400 text-slate-800 font-bold text-[8px]'>
                <div className=' flex-1 pr-4'>{'Particulars'}</div> <div>{'Amount'}</div>
            </div>

            {data && data.fee_items.map((item, index) => (
                <div key={index} className='text-xs/[12px] p-1 flex flex-row flex-nowrap justify-between items-center
                    border-b border-slate-50/20 m-0'>
                    <div className='flex flex-row gap-2 '>
                        {item.fee_head.name}
                        {
                            item.fee_item_months &&
                            item.fee_item_months.length > 0 &&
                            item.fee_item_months.map((x, index) => (
                                <div key={index} className='underline decoration-blue-400 text-green-600 text-xs'>{x.month?.short_name}</div>
                            ))
                        }
                        {/* ( item.fee_item_months.length>0 && item.fee_item_months.map(x=>x.month.short_name))} */}
                    </div> <div>{parseFloat(item.total_amount).toFixed(2)}</div>
                </div>
            ))}
            <div>
                <div className='flex flex-row flex-nowrap justify-between items-center gap-1 p-1 border-t-2
                 m-0'>
                    <div className='text-right flex-1 pr-4'>{'Total:'}</div> <div>{parseFloat(data.total_amount).toFixed(2)}</div>
                </div>
            </div>
        </div>

    )
}

export const FeeItems = ({ fees, selectedStudentSession }) => {
    const [isOpen, setOpen] = useState()

    return (
        <>
            {/* <button onClick={() => setOpen(true)} className='btn btn-outline text-xs btn-primary btn-sm btn-rounded py-0 '>{'Details'}</button> */}
            <span onClick={() => setOpen(true)} className='bg-slate-100/20 hover:bg-slate-100/50
                    hover:shadow-lg     flex justify-between
                    items-center rounded-full   cursor-pointer'>
                <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
            </span>
            {
                isOpen &&
                <>
                    <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Edit Fees">
                        <EditFees userData={fees.student} fees={fees} isOpen={isOpen} setOpen={setOpen} selectedStudentSession={selectedStudentSession} />

                    </FormikEditFormModal>
                </>
            }
        </>
    )
}

const PrintToPdf = ({ fees, session_id }) => {
    const [isOpen, setOpen] = useState(false)


    return (
        <>
            {

                <span onClick={() => setOpen(true)} className='bg-slate-100/20 hover:bg-slate-100/50
hover:shadow-lg     flex justify-between
items-center rounded-full   cursor-pointer'>
                    <RiPrinterLine className='text-blue-300 text-xl  ' />
                </span>
            }
            {
                isOpen &&
                <PrintModal fees={fees} isOpen={isOpen} setOpen={setOpen} session_id={session_id} />
            }
        </>
    )
}