/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useDocumentTitle } from '../../../hooks';
import DataTable from './DataTable';



export default function DataList () {
    useDocumentTitle('TEACHERS')

    return (
        <div className="flex flex-col w-full overflow-y-auto">

            <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden"
            >
                <DataTable />


            </div>
        </div>
    );
}
