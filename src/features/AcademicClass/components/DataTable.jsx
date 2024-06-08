import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import FilterTable from '../../../components/tables/FilterTable';
import Filter from './Filter';

import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import { useAcademicClasses } from '../hooks/queries';

const initialValues = {
  campus_id: '1',
academic_standard_id:1,
  name: '',
  code: '',
  capacity:50

}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_standard_id: initialValues.academic_standard_id,
}

const DataTable = () => {

  const fetchedData = useAcademicClasses(initialFilterValues)

  const mData = fetchedData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Class", accessorKey: "name",
    },
    {
      header: "Campus", accessorKey: "campus.name",
    },
    {
      header: "Standard", accessorKey: "academic_standard.name",
    },
    {
      header: "Capacity", accessorKey: "capacity",
    },

    {
      header: 'Action', accessorKey: 'action', align: 'center',
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
      createForm={<Create initialValues={initialValues} modal={true} />}
      createFormTitle="Create Academic Class"
      filter={
        <Filter fetchedData={fetchedData} initialFilterValues={initialFilterValues} />
      }
      mobileHeaders={['id', 'name']}
    />
  )
}

export default DataTable
