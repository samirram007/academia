

import { useMemo } from 'react';
import FilterTable from '../../../components/tables/FilterTable';


import { Link } from 'react-router';
import { useCampuses } from '../hooks/queries';
import DeleteCampus from './DeleteCampus';
const CampusTable = () => {
  const CampusData = useCampuses()


  const createRoute = `/campuses/create`
  const mData = CampusData.data?.data ?? [];

  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID", accessorKey: "id", visible: false, size: 50,
    },
    {
      header: "Name", accessorKey: "name", size: 300,
    },
    {
      header: "Code", accessorKey: "code", size: 50,
    },
    {
      header: "Contact No", accessorKey: "contact_no", size: 50,
    },
    {
      header: "Email", accessorKey: "email", size: 50,
    },
    {
      header: "Website", accessorKey: "website", size: 50,
    },
    {
      header: "Establishment Date", accessorKey: "establishment_date", size: 50,
    },
    {
      header: 'Action', accessorKey: 'action', align: 'center',
      cell: ({ row }) => {
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <div className="flex justify-start md:justify-center  items-center gap-2">
              <Link to={`/campuses/edit/${row.original.id}`}
              className='inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors ' >Edit</Link>
              <DeleteCampus initialValues={row.original} />

            </div>
          </div>
        )
      }
    }

  ]

  return (
    <FilterTable data={data} columns={columns}
      createRoute={createRoute}
      createFormTitle="Create Campus"
    />
  )
}

export default CampusTable
