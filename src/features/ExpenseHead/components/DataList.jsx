
  import { lazy } from 'react';
import { useDocumentTitle } from '../../../hooks'


  const DataTable =  lazy(() => import('./DataTable'));

const DataList = () => {
    useDocumentTitle()
    return (
        <>
            <div className="flex justify-stretch flex-col w-full overflow-y-auto">
                <div className="card  animated fadeInDown bg-zinc-600/20">
                    <DataTable />

                </div>
            </div>
        </>
    )
}
export default DataList