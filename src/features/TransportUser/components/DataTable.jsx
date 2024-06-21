import React, { useState } from 'react'


import { useMemo } from 'react';

import FilterTable from './FilterTable';

import { useTransportUsers } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';
import moment from 'moment';

const initialValues = {
  user_id: '',
  transport_id: 1,
  join_date: moment(new Date()).format('YYYY-MM-DD'),
  is_active:true,
  journey_type_id:1,
  is_free:false,
  monthly_charge:500

}


const DataTable = () => {
  const [initialFilterValues,setInitialFilterValues] = useState({
    transport_id: initialValues.transport_id,
  })
  const TransportUserData = useTransportUsers(initialFilterValues)


  const mData = TransportUserData.data?.data ?? [];

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
      header: 'Name',
      accessorKey: 'user.name',
    },
    {
      header: 'Transport',
      accessorKey: 'transport.name',
    },
    {
      header: 'Fee',
      accessorKey: 'transport.is_free',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-start  items-center gap-2">
            {row.original.is_free
            ? <span className="text-green-400 font-bold">Free</span>
            : row.original.monthly_charge}
          </div>
        )
      }
    },
    {
      header: 'Status',
      accessorKey: 'is_active',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-start  items-center gap-2">
            {row.original.is_active ? <span className="text-green-400 font-bold">Active</span> : 'Inactive'}
          </div>
        )
      }
    },

    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
           <Edit initialValues={row.original} />
           {/* <Delete initialValues={row.original} /> */}

          </div>
        )
      }
    }

  ]

  return (
    <FilterTable
      data={data} columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Traveler"
      TransportUserData={TransportUserData}
      initialFilterValues={initialFilterValues}
      setInitialFilterValues={setInitialFilterValues}
    />
  )
}

export default DataTable
