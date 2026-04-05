




import { useState } from 'react';
import Create from './Create';

import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router';
import { usePromotionContext } from '../context/usePromotionContext';
import PromotionTable from './PromotionTable';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const getInitials = (name) => {
  const safeName = (name || 'Student').trim();
  const parts = safeName.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
};

const resolveImagePath = (path) => {
  if (!path || typeof path !== 'string') return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return `${API_BASE}${path}`;
  return `${API_BASE}/${path.replace(/^\/+/, '')}`;
};

const StudentAvatar = ({ name, src }) => {
  const [hasError, setHasError] = useState(false);
  const resolved = resolveImagePath(src);
  if (!resolved || hasError) {
    return (
      <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xs font-semibold shrink-0'>
        {getInitials(name)}
      </div>
    );
  }
  return (
    <img
      src={resolved}
      alt={name}
      onError={() => setHasError(true)}
      className='w-10 h-10 rounded-full object-cover shrink-0'
    />
  );
};



const DataTable = () => {

  const {
    previousClassData,
    xData,
    isFetchingPreviousClassData,
    isReFetchingPreviousClassData,
    isErrorPreviousClassData,
    refetch,
    initialValues,
    initialFilterValues
  } = usePromotionContext();
  const navigate = useNavigate()





  /** @type {import('@tanstack/react-table').ColumnDef<any>} */
  const columns = [
    {
      header: "ID",
      accessorKey: "id", 
      size: 50,

    },
    {
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          className='!text-sky-500'
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
        />
      ),
      accessorKey: 'student_sessions && student_sessions[0].is_promoted',
      enableSorting: false,
      size: 50,
      cell: ({ row }) => {
        return (

          row.original.student_sessions && row.original.student_sessions[0].is_promoted
            ?
            <Checkbox checked={true} disabled={true} color="default" className='!text-blue-500' />
            :
            <Checkbox
              color="success"
              className='!text-green-500'
              checked={row.getIsSelected()}
              disabled={row.original.student_sessions && row.original.student_sessions[0].is_promoted ? row.getCanSelect() : !row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
            />

        )

      },

    },
    // {
    //   header: 'Promotion',
    //   accessorKey: 'is_promoted',
    //   cell: ({ row }) => row.original.student_sessions[0].is_promoted ? 'Promoted' : 'waiting'
    // },
    {
      header: 'Student Description',
      accessorKey: 'name',
      cell: ({ row }) => {
        const thisRow = row.original
        return (
          <div className="flex items-center gap-3">
            <StudentAvatar name={thisRow.name} src={thisRow.profile_document?.path} />
            <div>
              <div className='text-slate-800 dark:text-blue-200 font-bold text-sm'>{thisRow.name}</div>
              {thisRow &&
                <>
                <div className='flex flex-row gap-2 text-[9px]'>
                  <span className='text-emerald-600 dark:text-green-400 font-normal'>
                    <span className='mr-1'>Session:</span>
                    <span className='font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].academic_session.session}</span>
                    </span>
                  </div>
                <div className='flex flex-row gap-2 text-[9px]'>
                    <span>
                    <span className='text-blue-600 dark:text-blue-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].academic_class.name}</span>
                    </span>
                    <span>
                      Section:
                    <span className='text-red-500 dark:text-red-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].section.name}</span>
                    </span>
                    <span>
                      Roll:
                    <span className='text-emerald-600 dark:text-green-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].roll_no}</span>
                  </span>
                </div>
                </>
              }
            </div>
          </div>
        )
      }
    },
    {
      header: 'Campus',
      accessorKey: 'admission.campus.name',
    },
    {
      header: 'Session',
      accessorKey: ' student_sessions && student_sessions[0].academic_session.session',
      visible: false,
    },
    {
      header: 'Class',
      accessorKey: ' student_sessions && student_sessions[0].academic_class.name',
      visible: false,
    },
    {
      header: 'Action',
      accessorKey: 'action',
      align: 'right',
      cell: ({ row }) => {

        return (
          <div className="flex justify-end  items-center gap-2">
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer">
              Info
            </button>
            {/* <Edit initialValues={row.original} />
            <Delete initialValues={row.original} /> */}

          </div>
        )
      }
    }

  ]

  return (
    <PromotionTable columns={columns}
      createForm={<Create modal={true} />}
      createFormTitle="Create Promotion"

    />
  )
}

export default DataTable
