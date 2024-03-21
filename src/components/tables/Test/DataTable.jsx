import { useMemo, useState } from 'react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
 } from '@tanstack/react-table'
import { fetchUsers } from '../../../services'
import { useQuery } from '@tanstack/react-query'
import Table from './Table'
const DataTable = () => {

  const usersData = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000
  })


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

  ]

  const tableHooks=(hooks)=>{
    hooks.visibleColumns.push((columns)=>[
      ...columns,
        {
          id: "actions",
          Header: "Actions",
          Cell: ({ row }) => (
            <div className="flex space-x-2">
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => {
                  alert("You clicked the button")
                }}
              >
                Edit
              </button>
              <button
                className="text-red-400 hover:text-red-600"
                onClick={() => {
                  alert("You clicked the button")
                }}
              >
                Delete
              </button>
            </div>
          ),
        },
    ])
  }
  const [sorting,setSorting]=useState([])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    manualSorting:true,
    state:{sorting:sorting},
    onStateChange:setSorting,
    getSortedRowModel:getSortedRowModel(),
    meta:{
    },
   }
  )
if(usersData.isLoading) return <div>Loading..</div>
  if(usersData.isError) return <div>Error..</div>
  return (
    <div>

        <Table table={table} sorting={sorting} setSorting={setSorting}/>

    </div>
  )
}



export default DataTable
