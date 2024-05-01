import React from 'react'


import { useMemo } from 'react';

import BasicTable from '../../../components/tables/BasicTable';

import { useDesignations } from '../hooks/quaries';
import CreateDesignation from './CreateDesignation';
import EditDesignation from './EditDesignation';

import DeleteDesignation from './DeleteDesignation';

const initialValues = {
  campus_id: 1,
  session: '2024-2025',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  is_current: false,
}

const DesignationTable = () => {

  const DesignationData = useDesignations(initialValues)


  const mData = DesignationData.data?.data ?? [];

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
           <EditDesignation initialValues={row.original} />
           <DeleteDesignation initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createForm={<CreateDesignation modal={true} />}
      createFormTitle="Create Designation"

    />
  )
}

export default DesignationTable
