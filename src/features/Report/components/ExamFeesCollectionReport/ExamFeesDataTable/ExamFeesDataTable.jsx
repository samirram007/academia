

import { useMemo } from 'react';




import { DateTime } from 'luxon';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { Capitalize } from '../../../../../libs/utils';
import { useMonths } from '../../../../Common/hooks/quaries';

import ExamFeesCollectionReportTable from '../ExamFeesCollectionReportTable/ExamFeesCollectionReportTable';
import { useExamFeesCollectionReport } from '@/features/Report/hooks/queries';

const initialValues = {
  academic_session_id: moment(new Date()).format('YYYY'),
  academic_class_id: 10399,
}
const initialFilterValues = {
  academic_session_id: initialValues.academic_session_id,
  academic_class_id: initialValues.academic_class_id,
}



const ExamFeesDataTable = () => {

  const fetchedData = useExamFeesCollectionReport(initialFilterValues);

  const navigate = useNavigate()

  const mData = fetchedData.data?.data ?? [];


  const data = useMemo(() => {
    if (!mData.length) return [];

    // Step 1: find max exam fee count
    const maxFeeCount = Math.max(
      ...mData.map(row => row.examFees?.length ?? 0),
      0
    );

    // Step 2: pad examFees for each student
    return mData.map(row => {
      const fees = row.examFees ?? [];
      const paddedFees = [...fees];

      while (paddedFees.length < maxFeeCount) {
        paddedFees.push({
          fee_id: "",
          fee_no: "Pending",
          fee_head_name: "Examination Fee",
          fee_date: "",
          amount: 0,
        });
      }

      return {
        ...row,
        examFees: paddedFees,
      };
    });
  }, [mData]);
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
      header: <div className="text-left w-4/12 ">Name</div>,
      accessorKey: 'student_name',
      className: 'w-4/12 sticky left-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 z-10',
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
    {
      header: <div className='w-[400px]'>
        <div className='border-b border-slate-200 dark:border-slate-600 pb-1 font-semibold text-slate-600 dark:text-slate-300'>Exam Fees</div>
        <div className='grid grid-cols-[50px_100px_100px_1fr] gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400 font-normal normal-case tracking-normal'>
          <div className='text-left'>Fee No</div>
          <div className='text-center'>Fee Date</div>
          <div className='text-left'>Fee Head</div>
          <div className='text-right'>Amount</div>
        </div>
      </div>,
      accessorKey: 'examFees',
      cell: info => {
        const fees = info.row.original?.examFees;
        if (!fees || fees.length === 0) {
          return <div className='text-center text-red-500 dark:text-red-400 font-bold'>No Fees</div>
        }
        return <div className='w-[400px]'>
          {fees?.map(fee => (
            <div key={fee.fee_id} className="grid grid-cols-[50px_100px_100px_1fr] gap-2 border-b border-slate-100 dark:border-slate-700/60 py-1 pl-2">
              {
                fee.fee_no === "Pending" ?
                  <div className="col-span-4 font-bold text-left text-red-500 dark:text-red-400">{Capitalize(fee.fee_no)}</div>
                  :
                  <>
                    <div className="font-medium text-left text-slate-700 dark:text-slate-300">{Capitalize(fee.fee_no)}</div>
                    <div className="font-medium text-center text-slate-500 dark:text-slate-400">{fee.fee_date}</div>
                    <div className="font-medium text-left text-slate-600 dark:text-slate-300">{fee.fee_head_name}</div>
                    <div className="font-semibold text-right text-slate-700 dark:text-slate-200">{fee.amount}</div>
                  </>
              }
            </div>
          ))}
        </div>
      }
    },


  ]








  if (fetchedData.isError) return <div>Error...</div>
  //console.log(" data", mData)
  return (
    <ExamFeesCollectionReportTable
      data={data} columns={columns}
      initialFilterValues={initialFilterValues}
      fetchedData={fetchedData}
    />
  )
}

export default ExamFeesDataTable
