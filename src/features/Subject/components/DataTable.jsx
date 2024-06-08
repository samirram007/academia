import React from 'react'


import { useMemo } from 'react';

import FilterTable from '../../../components/tables/FilterTable';

import { useSubjects } from '../hooks/quaries';
import Create from './Create';
import Edit from './Edit';

import Delete from './Delete';
import Filter from './Filter';

const initialValues = {
  code: '',
  name: '',
  description:'',
  academic_standard_id:'',
  subject_group_id:'',


}
const initialFilterValues = {
  academic_standard_id: initialValues.academic_standard_id,
  subject_group_id: initialValues.subject_group_id,
}
const DataTable = () => {

  const SubjectsData = useSubjects(initialFilterValues)


  const mData = SubjectsData.data?.data ?? [];

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
      header: 'Type',
      accessorKey: 'subject_type',
    },
    {
      header: 'Group',
      accessorKey: 'subject_group.name',
    },
    {
      header: 'Standard',
      accessorKey: 'academic_standard.name',
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
      createFormTitle="Create Subject"
      filter={
        <Filter SubjectsData={SubjectsData}
          initialFilterValues={initialFilterValues} />
      }

    />
  )
}

export default DataTable
