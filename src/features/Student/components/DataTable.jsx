import { lazy } from 'react';


import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';

import { useNavigate } from 'react-router';
import { useStudents } from '../hooks/queries';

import moment from 'moment';
// import FilterTable from './FilterTable';
const Filter = lazy(() => import('./Filter'))
const FilterTable = lazy(() => import('./FilterTable'))


const initialValues = {
  academic_session_id: moment(new Date()).format('YYYY'),
  academic_class_id: 10399,
  campus_id: 1,
  name: '',
  is_active: false
}
const initialFilterValues = {
  campus_id: initialValues.campus_id,
  academic_class_id: initialValues.academic_class_id,
  academic_session_id: initialValues.academic_session_id,
  filter_option: 'active'
}

const getInitials = (name) => {
  const safeName = (name || 'Student').trim();
  const parts = safeName.split(/\s+/).filter(Boolean);

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
};

const StudentAvatar = ({ name, src }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs font-semibold'>
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${name || 'Student'} avatar`}
      className='w-10 h-10 rounded-full object-cover'
      onError={() => setHasError(true)}
    />
  );
};

const DataTable = () => {
  const fetchedData = useStudents(initialFilterValues)
  const navigate = useNavigate()
  const createRoute = `/students/create`

  const mData = fetchedData.data?.data ?? [];


  const data = useMemo(() => [...mData], [mData]);

  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      visible: false,
      size: 50,

    },
    {
      header: "Roll",
      accessorKey: "student_session.roll_no",
      visible: false
    },
    {
      header: "Name",
      accessorKey: "name",
      size: 300,
      cell: ({ row }) => {
        const thisRow = row.original.student_sessions
          .find(x => x.academic_session_id == initialFilterValues.academic_session_id)
        return (
          <div className='flex flex-row gap-2'>
            <StudentAvatar
              name={row.original.name}
              src={row.original.profile_document?.path}
            />

            <div>
              <div className='text-slate-800 dark:text-blue-100 font-semibold text-sm md:text-base'>{row.original.name}</div>
              {thisRow &&
                <div className='flex flex-row gap-2 text-[11px]'>
                  <span>
                    <span className='text-blue-600 dark:text-blue-300 font-semibold'>{thisRow.academic_class.name}</span>
                  </span>
                  <span>
                    Section:
                    <span className='text-rose-500 dark:text-rose-300 font-semibold'>{thisRow.section.name}</span>
                  </span>
                  <span>
                    Roll:
                    <span className='text-emerald-600 dark:text-emerald-300 font-semibold'>{thisRow.roll_no}</span>
                  </span>

                </div>}
            </div>
          </div>

        )
      }
    },
    {
      header: "Type",
      accessorKey: "user_type",
      size: 300,
      visible: false
    },

    {
      header: "Email",
      accessorKey: "email",
      size: 200,
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
      cell: ({ row }) => {
        return (
          <div className="flex justify-end  items-center gap-2">
            {/* <button onClick={() => { navigate(`/students/info/${btoa(row.original.student_sessions.filter(x=>x.academic_session.is_current==1).id)}`) }} */}
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="btn btn-primary btn-sm btn-rounded ">
              Info..
            </button>
            <button onClick={() => { navigate(`/students/edit/${row.original.id}`) }}
              className="btn btn-primary btn-sm btn-rounded ">
              Edit
            </button>
            {/* <button onClick={() => { deleteUserData(row.original.id) }}
              className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-red-400 text-red-500 hover:bg-red-500 hover:text-white dark:border-red-400 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white transition-colors  ">
              Delete
            </button> */}
          </div>
        )
      }
    }

  ]

  const deleteUserData = (id) => {
    navigate(`/students/delete/${id}`)
  }
  return (
    <FilterTable data={data} columns={columns}
      createRoute={createRoute}
      fetchedData={fetchedData}
      filter={
        <Filter fetchedData={fetchedData}
          initialFilterValues={initialFilterValues} />
      }
    />
  )
}

export default DataTable
