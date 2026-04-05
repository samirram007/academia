import FilterTable from '../../../components/tables/FilterTable';

import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { useNavigate } from 'react-router';
import { useTeachers } from '../hooks/queries';
const DataTable = () => {
    const fetchedData =useTeachers()
    const navigate = useNavigate()
    const createRoute=`/teachers/create`

      const mData = fetchedData.data?.data ?? [];

      const data = useMemo(() => [...mData], [mData]);

      /** @type {import('@tanstack/react-table').ColumnDef<any>} */
      const columns = [
        {
          header: "ID",
          accessorKey: "id",
          visible: false,
          size:50,

        },
        {
          header: "Name",
          accessorKey: "name",
          size:300,
        },
        {
          header: "Type",
          accessorKey: "user_type",
          size:300,
        },
        {
          header: "Email",
          accessorKey: "email",
          size:200,
        },
        {
            header: 'DOB',
            accessorKey: 'dob',
            cell: info =>
              DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
        },
        {
            header: 'Action',
            accessorKey: 'action',
          align: 'right',
            cell: ({row})=>{
                return (
                  <div className="flex justify-end  items-center">
                        <button onClick={()=>{ editUserData(row.original.id)}}
                      className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors ">
                            Edit
                    </button>
                    </div>
                )
            }
        }

      ]
      const editUserData=(id)=>{
        navigate(`/teachers/edit/${id}`)
      }
  return (
    <FilterTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default DataTable
