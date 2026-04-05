

import { useMemo } from 'react';



import Loader from '../../../components/Loader';
import ModalTable from '../../../components/tables/ModalTable';
import { useFeeTemplateItems } from '../hooks/quaries';
// import Delete from './Delete';



const initialValues = {
  academic_session_id: 1,
  academic_class_id: 1,
  campus_id: 1,
  name: '',
  is_active: false
}

const DataTable = ({ fee_template_id, setEntryId }) => {

  const FeeTemplateItemData = useFeeTemplateItems({ fee_template_id })


  const mData = FeeTemplateItemData.data?.data ?? [];
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
      header: "Sl No",
      accessorKey: "sort_index",

    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Active",
      accessorKey: "is_active",
      align: 'right',
      cell: info => {
        return (
          <div className={`flex justify-end  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },
    {
      header: "Customizable",
      accessorKey: "is_customizable",
      align: 'right',
      cell: info => {
        return (
          <div className={`flex justify-end  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },
    {
      header: "Periodic Details",
      accessorKey: "keep_periodic_details",
      align: 'right',
      cell: info => {
        return (
          <div className={`flex justify-end  items-center gap-2  ${info.getValue() ? 'text-green-400' : ''}`}>
            {info.getValue() ? 'Yes' : 'No'}
          </div>
        )
      }
    },


    {
      header: 'Action',
      accessorKey: 'action',
      align: 'right',
      cell: ({ row }) => {
        return (
          <div className="flex justify-end  items-center gap-2">
            <button onClick={() => setEntryId(row.original.id)}
              className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold border border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors ">
              Edit
            </button>


            {/* <Delete initialValues={row.original} /> */}

          </div>
        )
      }
    }

  ]

  return (
    <>
{FeeTemplateItemData.isLoading?<Loader/>:
      <ModalTable
        data={data}
        columns={columns}
      />
  }
    </>
  )
}

export default DataTable
