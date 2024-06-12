import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useExpenses } from '../hooks/quaries';
import CreateExpense from './Create';
import Edit from './Edit';
import Delete from './Delete';
import ExpenseTable from './ExpenseTable';
import moment from 'moment';



const initialValues = {
  expense_no: '',
  expense_date: new Date(),
  academic_session_id: 1,
  campus_id: 1,
  user_id: null,
  total_amount: 0,
  paid_amount: 0,
  balance_amount: 0,
  payment_mode: 'CASH'
}

const currentDate = moment(new Date()).format('YYYY-MM-DD');
 const firstDayOfYear = moment(new Date(new Date().getFullYear(), 0, 1)).format('YYYY-MM-DD'); // January 1st of the current year

const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_session_id: initialValues.academic_session_id,
  from: firstDayOfYear, // 'YYYY-MM-DD' format for first day of the year
  to: currentDate  // 'YYYY-MM-DD' format for current date
};
// const initialFilterValues = {
//   campus_id: initialValues.campus_id,
//   academic_session_id: initialValues.academic_session_id,
//    from:new Date().toISOString().split('T')[0],
//    to:new Date().toISOString().split('T')[0]
// }
// console.log(initialFilterValues)
const DataTable = () => {

  // const formattedDate = new Date().toString('yyyy-MM-dd');

  // console.log('Date',formattedDate);
  const ExpenseData = useExpenses(initialFilterValues)
  const navigate = useNavigate()

  const mData = ExpenseData.data?.data ?? [];
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
      header: "Expense No",
      accessorKey: "expense_no",

    },
    {
      header: "Date",
      accessorKey: "expense_date",
      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),

    },
    {
      header: "Campus",
      accessorKey: "campus.name",
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


    <ExpenseTable
      data={data}
      columns={columns}
      createForm={<CreateExpense modal={true} />}
      createFormTitle={'Expense No: [new]'}
      ExpenseData={ExpenseData}
      initialFilterValues={initialFilterValues}

    />

  )
}

export default DataTable
