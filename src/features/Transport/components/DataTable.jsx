import React from 'react'


import { useMemo } from 'react';

import FilterTable from '../../../components/tables/FilterTable';

import { useTransports } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';

const initialValues = {
  name: '',
  registration_no: '',
  registration_date: new Date().toUTCString(),
  registration_valid_date: new Date(),
  chasis_no: '',
  engine_no: '',
  color: '',
  capacity: 50,
  transport_type_id: 1

}
const initialFilterValues = {
  transport_type_id: initialValues.transport_type_id,
}

const DataTable = () => {
  const TransportData = useTransports()


  const mData = TransportData.data?.data ?? [];

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
      accessorKey: 'name',
    },
    {
      header: 'Registration No',
      accessorKey: 'registration_no',
    },
    {
      header: 'Type',
      accessorKey: 'transport_type.name',
      cell: ({ row }) => {

        return (
          <div className="text-yellow-600 font-bold">
           {row.original.transport_type.name}
          </div>
        )
      }
    },

    {
      header: 'Capacity',
      accessorKey: 'capacity',
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

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
    <FilterTable
      data={data} columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Transport"
      // filter={
      //   <Filter TransportData={TransportData} initialFilterValues={initialFilterValues} />
      // }
    />
  )
}

export default DataTable
