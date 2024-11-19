




import Create from './Create';

import { Checkbox } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { usePromotionContext } from '../context/usePromotionContext';
import PromotionTable from './PromotionTable';



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
      visible: false,
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
          <div className="flex items-center gap-2">
            {thisRow.profile_document ?
              <img src={thisRow.profile_document.path} className='w-10 h-10 rounded-full' /> :
              <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/documents/student.png`} className='w-10 h-10 rounded-full' alt="" />}
            <div>

              <div className='text-blue-200 font-bold text-md'>{thisRow.name}</div>
              {thisRow &&
                <>
                  <div className='flex flex-row gap-2  text-[8px]'>
                    <span className='text-green-400 font-normal'>
                      <span className='mr-2'> Session:</span>
                      <span className='  font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].academic_session.session}</span>
                    </span>
                  </div>
                  <div className='flex flex-row gap-2  text-[8px]'>
                    <span>
                      <span className='text-blue-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].academic_class.name}</span>
                    </span>
                    <span>
                      Section:
                      <span className='text-red-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].section.name}</span>
                    </span>
                    <span>
                      Roll:
                      <span className='text-green-400 font-bold'>{thisRow.student_sessions && thisRow.student_sessions[0].roll_no}</span>
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
      align: 'center',
      cell: ({ row }) => {

        return (
          <div className="flex justify-start md:justify-center  items-center gap-2">
            <button onClick={() => { navigate(`/students/info/${row.original.id}`) }}
              className="btn btn-outline btn-primary btn-sm btn-rounded ">
              Info..
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
