
import { useMemo } from 'react';
import FilterTable from '../../../components/tables/FilterTable';

import { useNavigate } from 'react-router';
import { useIncomeGroups } from '../hooks/queries';
import CreateIncomeGroup from './Create';
import Delete from './Delete';
import Edit from './Edit';
const DataTable = () => {
    const IncomeGroupData = useIncomeGroups()
      const navigate = useNavigate()

      const createRoute=`/fee_heads/create`

      const mData = IncomeGroupData.data?.data ?? [];

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
            header: 'Action',
            accessorKey: 'action',
            align: 'right',
            cell: ({row})=>{
                return (
                  <div className="flex justify-end  items-center gap-2">
                  <Edit initialValues={row.original} />
                  <Delete initialValues={row.original} />

                 </div>
                )
            }
        }

      ]

  return (
    <FilterTable data={data} columns={columns}
    // createRoute={createRoute}
     createForm={<CreateIncomeGroup modal={true} />}
     />
  )
}

export default DataTable
