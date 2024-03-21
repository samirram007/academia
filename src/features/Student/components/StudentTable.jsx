import React from 'react'
import BasicTable from '../../../components/tables/BasicTable'

import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useNavigate  } from 'react-router-dom';
import { useStudents } from '../hooks/queries';
const StudentTable = () => {
    const studentsData =useStudents()
    const navigate = useNavigate()
    const createRoute=`/students/create`

      const mData = studentsData.data?.data ?? [];

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
            align: 'center',
            cell: ({row})=>{
                return (
                    <div className="flex justify-start md:justify-center  items-center">
                        <button onClick={()=>{ editUserData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteUserData(row.original.id)}}
                        className="btn btn-outline btn-primary btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editUserData=(id)=>{
        navigate(`/students/edit/${id}`)
      }
      const deleteUserData=(id)=>{
        navigate(`/students/delete/${id}`)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default StudentTable
