import React from 'react'

import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';
import { DateTime } from 'luxon'
import BasicTable from '../../../components/tables/BasicTable';


import DeleteCampus from './DeleteCampus';
import { useCampuses } from '../hooks/queries';
import { Link } from 'react-router-dom';
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
              className='btn btn-outline btn-primary btn-sm btn-rounded ' >Edit</Link>
              <DeleteCampus initialValues={row.original} />

            </div>
          </div>
        )
      }
    }

  ]

  return (
    <BasicTable data={data} columns={columns}
      createRoute={createRoute}
      createFormTitle="Create Campus"
    />
  )
}

export default CampusTable
