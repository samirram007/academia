import React from 'react'


import { useMemo } from 'react';

import FilterTable from '../../../components/tables/FilterTable';

import { useSections } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';

const initialValues = {
  code: '',
  name: '',

}

const DataTable = () => {

  const SectionData = useSections(initialValues)


  const mData = SectionData.data?.data ?? [];

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
      header: 'Code',
      accessorKey: 'code',
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
      createFormTitle="Create Section"

    />
  )
}

export default DataTable
