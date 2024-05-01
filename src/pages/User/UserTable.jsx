import React from 'react'


import { useMemo } from 'react';
import { DateTime } from 'luxon'

import { useNavigate, useNavigation } from 'react-router-dom';
import { useUsers } from '../../hooks/queries';
import BasicTable from '../../components/tables/BasicTable';
const UserTable = () => {
    const usersData =useUsers()
    const navigate = useNavigate()
    const createRoute=`/users/create`

      const mData = usersData.data?.data ?? [];

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
                        className="btn btn-blue btn-sm btn-rounded ">
                            Edit
                        </button>
                        <button onClick={()=>{ deleteUserData(row.original.id)}}
                        className="btn btn-red btn-sm btn-rounded ml-2">
                            Delete
                        </button>
                    </div>
                )
            }
        }

      ]
      const editUserData=(id)=>{
        navigate(`/users/edit/${id}`)
      }
      const deleteUserData=(id)=>{
        navigate(`/users/delete/${id}`)
      }
  return (
    <BasicTable data={data} columns={columns} createRoute={createRoute} />
  )
}

export default UserTable
