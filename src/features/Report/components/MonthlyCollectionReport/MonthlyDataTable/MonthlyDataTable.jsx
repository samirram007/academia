

import { useMemo } from 'react';




import { DateTime } from 'luxon';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { Capitalize } from '../../../../../libs/utils';
import { useMonths } from '../../../../Common/hooks/quaries';
import { useMonthlyFeeCollectionReport } from '../../../hooks/queries';
import MonthlyCollectionReportTable from '../MonthlyCollectionReportTable/MonthlyCollectionReportTable';

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

  const data = useMemo(() => [...mData], [mData]);
  // const data = useMemo(() => {

  //   return mData.map(item => ({
  //     ...item,
  //     selectedFeesData: item
  //   }))
  // }, [mData]);



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
      className: 'sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-10',
      cell: info => {
        const student = info.row.original
        return <>
          <div className='text-blue-600 dark:text-blue-400 font-bold text-sm cursor-pointer hover:underline' onClick={() => { navigate(`/students/info/${student.id}`) }}>{student.student_name}</div>
          {student &&
            <div className='flex flex-row gap-2 text-[8px] text-slate-500 dark:text-slate-400'>
              <span>
                <span className='text-blue-500 dark:text-blue-400 font-bold'>{student.class}</span>
              </span>
              <span>
                Section:
                <span className='text-red-500 dark:text-red-400 font-bold'>{student.section}</span>
              </span>
              <span>
                Roll:
                <span className='text-green-600 dark:text-green-400 font-bold'>{student.roll_no}</span>
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
          return <div className='text-center px-1'>
            <div className='text-slate-400 dark:text-slate-500 font-bold text-[13px]'>{Capitalize(getMonth?.short_name)} </div>
            <div className='text-[11px]'>{getMonth?.id <= moment(new Date()).format('M') ? <span className="text-red-500 dark:text-red-400 font-medium">Due</span> : ''}</div>
          </div>
        }
        return <div className='text-center px-1'>
          <div className='text-green-600 dark:text-green-400 font-bold text-[13px]'>{getMonth?.amount} </div>
          <div className='text-[11px] text-slate-500 dark:text-slate-400'>Fee No {getMonth?.fee_no} </div>
          <div className='text-[11px] text-slate-400 dark:text-slate-500'>{DateTime.fromISO(getMonth?.fee_date).toLocaleString(DateTime.DATE_MED)} </div>
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
