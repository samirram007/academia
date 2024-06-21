import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import Filter from './Filter';

import { useNavigate } from 'react-router-dom';

import { useTransportExpenses } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';
import Delete from './Delete';
import TransportExpenseTable from './TransportExpenseTable';
import moment from 'moment';



const initialValues = {
  expense_no:'new',
  expense_date:     moment(new Date()).format('YYYY-MM-DD'),
  academic_session_id: moment(new Date()).format('YYYY'),
  campus_id: 1,
  user_id: null,
  total_amount: 0,
  paid_amount: 0,
  balance_amount: 0,
  payment_mode:'CASH',
  transport_expense_items:[]
}
const currentDate = moment(new Date()).format('YYYY-MM-DD');
 const firstDayOfYear = moment(new Date(new Date().getFullYear(), 0, 1)).format('YYYY-MM-DD'); // January 1st of the current year

const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_session_id: initialValues.academic_session_id,
  from: firstDayOfYear, // 'YYYY-MM-DD' format for first day of the year
  to: currentDate  // 'YYYY-MM-DD' format for current date
};
// console.log(initialFilterValues)
const DataTable = () => {

  // const formattedDate = new Date().toString('yyyy-MM-dd');

  // console.log('Date',formattedDate);
  const TransportExpenseData = useTransportExpenses(initialFilterValues)
  const navigate = useNavigate()

  const mData = TransportExpenseData.data?.data ?? [];
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


    <TransportExpenseTable
      data={data}
      columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle={'Transport Expense No: [new]'}
      TransportExpenseData={TransportExpenseData}
      initialFilterValues={initialFilterValues}

    />

  )
}

export default DataTable
