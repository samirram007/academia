import React from 'react'
import BasicTable from '../../tables/BasicTable'
import { useQuery } from '@tanstack/react-query';
import { fetchDepartments  } from '../../../services';
import { useMemo } from 'react';
import { DateTime } from 'luxon'
const DepartmentTable = () => {
    const DepartmentData = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
        staleTime:Infinity
      })

      const createRoute=`/departments/create`
      const mData = DepartmentData.data?.data ?? [];

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
          header: "Contact No",
          accessorKey: "contact_no",
          size:200,
        },
        {
          header: "Email",
          accessorKey: "email",
          size:200,
        },

        {
            header: 'Action',
            accessorKey: 'action',
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editDepartmentData(row.original.id)}}
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteDepartmentData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editDepartmentData=(id)=>{
        alert(id)
      }
      const deleteDepartmentData=(id)=>{
        alert(id)
      }
  return (
    <BasicTable
    data={data} columns={columns} createRoute={createRoute}
    mobileHeaders={['id','year']}
    />
  )
}

export default DepartmentTable
