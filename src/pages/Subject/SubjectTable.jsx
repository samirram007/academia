import React from 'react'
import BasicTable from '../../tables/BasicTable'

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import { useSubjects } from '../../../hooks/queries';
const SubjectTable = () => {
    const SubjectData = useSubjects();
    // const SubjectData = useQuery({
    //     queryKey: ['academic_sessions'],
    //     queryFn: fetchSubjects,
    //     staleTime:Infinity
    //   })

      const createRoute=`/academic_sessions/create`

      const mData = SubjectData.data?.data ?? [];

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
          header: "Session",
          accessorKey: "session",
          size:300,
        },
        {
          header: "Campus",
          accessorKey: "campus.name",
          size:200,
        },
        {
            header: 'Start Date',
            accessorKey: 'start_date',
            cell: info =>
              DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
        },
        {
            header: 'End Date',
            accessorKey: 'end_date',
            cell: info =>
              DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED),
        },
        {
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editSubjectData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteSubjectData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editSubjectData=(id)=>{
        alert(id)
      }
      const deleteSubjectData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable
    data={data} columns={columns} createRoute={createRoute}
    mobileHeaders={['id','session']}
    />
  )
}

export default SubjectTable
