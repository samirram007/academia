import React from 'react'

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import FilterTable from '../../../components/tables/FilterTable';

import { useNavigate } from 'react-router-dom';
import { useExpenseHeads } from '../hooks/queries';
import CreateExpenseHead from './Create';
import Delete from './Delete';
import Edit from './Edit';


const DataTable = () => {

    const fetchedData = useExpenseHeads({})
      const navigate = useNavigate()

      const createRoute=`/expense_heads/create`

      const mData = fetchedData.data?.data ?? [];

      const data = useMemo(() => [...mData], [mData]);

      /** @type {import('@tanstack/react-table').ColumnDef<any>} */
      const columns = [
        {
          header: "ID",
          accessorKey: "id",
          visible: false,
          size:50,

        },
        {
          header: "Name",
          accessorKey: "name",
          size:300,
        },

        {
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                  <div className="flex justify-start md:justify-center  items-center gap-2">
                  <Edit initialValues={row.original} />
                  <Delete initialValues={row.original} />

                 </div>
                )
            }
        }

      ]

  return (
    <FilterTable data={data} columns={columns}
    // createRoute={createRoute}
    //  createForm={<CreateExpenseHead modal={true} />}
     />
  )
}

export default DataTable
