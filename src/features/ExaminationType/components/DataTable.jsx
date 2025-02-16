

import { useMemo } from 'react';

import FilterTable from '../../../components/tables/FilterTable';

import { useExaminationTypes } from '../hooks/quaries';

import Create from './Create';
import Delete from './Delete';
import Edit from './Edit';

const initialValues = {
  name: "Test",
  is_promotional_exam: false
}

const DataTable = () => {

  const fetchedData = useExaminationTypes(initialValues)


  const mData = fetchedData.data?.data ?? [];

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
      header: 'Promotional Exam',
      accessorKey: 'is_promotional_exam',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-start  items-center gap-2">
            {row.original.is_promotional_exam ? <span className="text-green-400 font-bold">YES</span> : 'NO'}
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
      createFormTitle="Create Examination Type"

    />
  )
}

export default DataTable
