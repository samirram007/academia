import React, { lazy } from 'react'

import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useNavigate } from 'react-router-dom';
import { useExpenseHeads } from '../hooks/queries';

// import FilterTable from '../../../components/tables/FilterTable';
const FilterTable =lazy(()=>import('../../../components/tables/FilterTable'));
const CreateExpenseHead =lazy(()=>import('./Create'));
const Edit =lazy(()=>import('./Edit'));


const DataTable = () => {

    const fetchedData = useExpenseHeads({})

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
          header: "Group",
          accessorKey: "expense_group.name",
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

                 </div>
                )
            }
        }

      ]

  return (
    <FilterTable data={data} columns={columns}
     createForm={<CreateExpenseHead modal={true} />}
     />
  )
}

export default DataTable
