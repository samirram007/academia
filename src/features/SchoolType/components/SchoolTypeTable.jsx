import React from 'react'


import { useMemo } from 'react';

import BasicTable from '../../../components/tables/BasicTable';

import { useSchoolTypes } from '../hooks/quaries';
import CreateSchoolType from './CreateSchoolType';
import EditSchoolType from './EditSchoolType';

import DeleteSchoolType from './DeleteSchoolType';

const initialValues = {
  campus_id: 1,
  session: '2024-2025',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  is_current: false,
}

const SchoolTypeTable = () => {

  const SchoolTypeData = useSchoolTypes(initialValues)


  const mData = SchoolTypeData.data?.data ?? [];

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
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
           <EditSchoolType initialValues={row.original} />
           <DeleteSchoolType initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createForm={<CreateSchoolType modal={true} />}
      createFormTitle="Create School Type"

    />
  )
}

export default SchoolTypeTable
