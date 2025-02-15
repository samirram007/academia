

import { DateTime } from 'luxon';
import { useMemo } from 'react';


import { useNavigate } from 'react-router-dom';

import moment from 'moment';
import { useExaminations } from '../hooks/quaries';
import CreateExamination from './Create';
import Delete from './Delete';
import Edit from './Edit';
import ExaminationTable from './ExaminationTable';



const initialValues = {
  examination_no: '',
  examination_date: new Date(),
  academic_session_id: moment(new Date()).format('YYYY'),
  user_id: null,
  total_amount: 0,
  paid_amount: 0,
  balance_amount: 0,
  payment_mode: 'CASH'
}

const currentDate = moment(new Date()).format('YYYY-MM-DD');
const firstDayOfYear = moment(new Date(new Date().getFullYear(), 0, 1)).format('YYYY-MM-DD'); // January 1st of the current year

const initialFilterValues = {
  academic_session_id: initialValues.academic_session_id,
  from: firstDayOfYear, // 'YYYY-MM-DD' format for first day of the year
  to: currentDate  // 'YYYY-MM-DD' format for current date
};
const DataTable = () => {

  // const formattedDate = new Date().toString('yyyy-MM-dd');

  // console.log('Date',formattedDate);
  const ExaminationData = useExaminations(initialFilterValues)
  const navigate = useNavigate()

  const mData = ExaminationData.data?.data ?? [];
  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,
    },
    {
      header: "Examination No",
      accessorKey: "examination_no",
      cell: info =>
        (<div className='text-center w-20'> {info.getValue() ?? ''} {info.row.original?.voucher_no ? `(${info.row.original?.voucher_no})` : ''}</div>),

    },
    {
      header: "Date",
      accessorKey: "examination_date",
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),

    },
    {
      header: "Remarks",
      accessorKey: "narration",
    },

    {
      header: "Session",
      accessorKey: "academic_session.session",

    },
    {
      header: "Amount",
      accessorKey: "total_amount",

    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            {/* <Print initialValues={row.original} /> */}
            <Edit initialValues={row.original} />
            <Delete initialValues={row.original} />

          </div>
        )
      }
    }

  ]
  return (


    <ExaminationTable
      data={data}
      columns={columns}
      createForm={<CreateExamination modal={true} />}
      createFormTitle={'Examination No: [new]'}
      ExaminationData={ExaminationData}
      initialFilterValues={initialFilterValues}

    />

  )
}

export default DataTable
