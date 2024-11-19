import React from 'react'


import { useMemo } from 'react';




import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useMonthlyFeeCollectionReport } from '../../../hooks/queries';
import MonthlyCollectionReportTable from '../MonthlyCollectionReportTable/MonthlyCollectionReportTable';
import { useMonths } from '../../../../Common/hooks/quaries';
import { current } from '@reduxjs/toolkit';
import { DateTime } from 'luxon';
import { Capitalize } from '../../../../../libs/utils';

const initialValues = {
  academic_session_id: moment(new Date()).format('YYYY'),
  academic_class_id: 10399,
}
const initialFilterValues = {
  academic_session_id: initialValues.academic_session_id,
  academic_class_id: initialValues.academic_class_id,
}



const MonthlyDataTable = () => {

  const fetchedData = useMonthlyFeeCollectionReport(initialFilterValues);
  const feeMonths = useMonths();
  const navigate = useNavigate()

  const mData = fetchedData.data?.data ?? [];
  const monthData = feeMonths.data?.data ?? [];


  const data = useMemo(() => {

    return mData.map(item => ({
      ...item,
      selectedFeesData: item
    }))
  }, [mData]);



  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,
      isPinned: true,

    },
    {
      header: 'Class',
      accessorKey: 'class',
      isPinned: true,
      className: 'hidden',
      visible: false
    },
    {
      header: 'Roll',
      accessorKey: 'roll_no',
      isPinned: true,
      className: 'hidden',
      visible: false
    },
    {
      header: 'Name',
      accessorKey: 'student_name',
      className: 'pinned-left sticky left-0 bg-slate-800 border-r-2 border-b-[1px] border-violet-500 ',
      cell: info => {
        const student = info.row.original
        return <>
          <div className='text-blue-200 font-bold text-md cursor-pointer btn-link' onClick={() => { navigate(`/students/info/${student.id}`) }}>{student.student_name}</div>
          {student &&
            <div className='flex flex-row gap-2  text-[8px]'>
              <span>
                <span className='text-blue-400 font-bold'>{student.class}</span>
              </span>
              <span>
                Section:
                <span className='text-red-400 font-bold'>{student.section}</span>
              </span>
              <span>
                Roll:
                <span className='text-green-400 font-bold'>{student.roll_no}</span>
              </span>

            </div>}
        </>

      }


    },


  ]

  monthData.map((tab, index) => {
    const newColumn = {
      header: `${tab.short_name}`,
      accessorKey: `${index}`,
      align: 'center',
      cell: ({ row }) => {
        const getMonth = row.original.months.find(x => x.id === tab.id)
        if (getMonth?.amount === 0) {
          return <div className='text-center border-x-2 border-slate-400/10 text-gray-500 text-[11px]'>
            <div className='text-gray-600 font-bold text-[14px]'>{Capitalize(getMonth?.short_name)} </div>
            <div className='  text-[11px]'>{getMonth?.id <= moment(new Date()).format('M') ? <span className="text-red-500">Due</span> : ''}</div>
            {/* <div>{getMonth?.id}??{ moment(new Date()).format('M')} </div> */}

          </div>
        }
        return <div className='text-center border-x-2 border-slate-400/10 text-gray-500 text-[11px]'>
          <div className='text-green-500 font-bold text-[14px]'>{getMonth?.amount} </div>
          <div className='  text-[11px]'>Fee No  {getMonth?.fee_no} </div>
          <div className=' text-[11px]'>{DateTime.fromISO(getMonth?.fee_date).toLocaleString(DateTime.DATE_MED)} </div>
        </div>
      }
    }
    // columns.splice(columns.length - 1, 0, newColumn)
    columns.splice(4 + index, 0, newColumn);
  })






  if (fetchedData.isError) return <div>Error...</div>

  return (
    <MonthlyCollectionReportTable
      data={data} columns={columns}
      initialFilterValues={initialFilterValues}
      fetchedData={fetchedData}
    />
  )
}

export default MonthlyDataTable
