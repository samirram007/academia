import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import BasicTable from '../../../components/tables/BasicTable';
import Filter from './Filter';

import CreateAcademicClass from './CreateAcademicClass';
import EditAcademicClass from './EditAcademicClass';

import DeleteAcademicClass from './DeleteAcademicClass';
import { useAcademicClasses } from '../hooks/queries';

const initialValues = {
  campus_id: '1',
  class: '2024',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date().toISOString().slice(0, 10),
  is_current: false,
}
const initialFilterValues = {
  campus_id: initialValues.campus_id
}

const AcademicClassTable = () => {

  const AcademicClassData = useAcademicClasses(initialFilterValues)

  const mData = AcademicClassData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Class", accessorKey: "name", size: 300, cell: info => (
        <div className="flex justify-start    items-center gap-2">
          <span className="text-gray-500">{info.row.original.name} </span>
          {info.row.original.is_current ? <span className="text-green-600 text-sm">[CURRENT]</span> : ''}
        </div>
      )
    },
    {
      header: "Campus", accessorKey: "campus.name", size: 200,
    },

    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <EditAcademicClass initialValues={row.original} />
            <DeleteAcademicClass initialValues={row.original} />
          </div>
        )
      }
    }

  ]

  return (
    <BasicTable
      data={data} columns={columns}
      createForm={<CreateAcademicClass initialValues={initialValues} modal={true} />}
      createFormTitle="Create Academic Class"
      filter={
        <Filter AcademicClassData={AcademicClassData} initialFilterValues={initialFilterValues} />
      }
      mobileHeaders={['id', 'name']}
    />
  )
}

export default AcademicClassTable
