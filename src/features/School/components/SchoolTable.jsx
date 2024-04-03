import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';


import DeleteSchool from './DeleteSchool';
import { useSchools } from '../hooks/queries';
import { Link } from 'react-router-dom';
const SchoolTable = () => {
  const SchoolData = useSchools()


  const createRoute = `/schools/create`
  const mData = SchoolData.data?.data ?? [];

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
        // console.log(`/schools/edit/${row.original.id}`)
        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <div className="flex justify-start md:justify-center  items-center gap-2">
              <Link to={`/schools/edit/${row.original.id}`}
              className='btn btn-outline btn-primary btn-sm btn-rounded ' >Edit</Link>
              <DeleteSchool initialValues={row.original} />

            </div>
          </div>
        )
      }
    }

  ]

  return (
    <BasicTable data={data} columns={columns}
      createRoute={createRoute}
      createFormTitle="Create School"
    />
  )
}

export default SchoolTable
