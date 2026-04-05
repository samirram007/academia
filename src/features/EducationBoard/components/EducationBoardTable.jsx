

import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { Link } from 'react-router';
import FilterTable from '../../../components/tables/FilterTable';

import { useEducationBoards } from '../hooks/quaries';


import DeleteEducationBoard from './DeleteEducationBoard';

const initialValues = {
  name: '',
  establishment_data: new Date().toISOString().slice(0, 10),
}

const EducationBoardTable = () => {

  const EducationBoardData = useEducationBoards(initialValues)

  const createRoute = `/education_boards/create`

  const mData = EducationBoardData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",      accessorKey: "id",      visible: false,      size: 50,
    },
    {
      header: "Name",      accessorKey: "name",      size: 300,
    },
    {
      header: "Code",      accessorKey: "code",      size: 50,
    },
    {
      header: "Email",      accessorKey: "email",      size: 50,
    },
    {
      header: "Contact No",      accessorKey: "contact_no",      size: 50,
    },
    {
      header: "Website",      accessorKey: "website",      size: 50,
    },
    {
      header: 'Establishment Date',      accessorKey: 'establishment_date',      cell: info =>
        DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
           <Link to={`/education_boards/edit/${row.original.id}`} className='inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors ' >Edit</Link>
           <DeleteEducationBoard initialValues={row.original} />

          </div>
        )
      }
    }

  ]

  return (
    <FilterTable
      data={data} columns={columns}
      createRoute={createRoute}
    />
  )
}

export default EducationBoardTable
