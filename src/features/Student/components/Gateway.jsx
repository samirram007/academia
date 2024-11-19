/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useDocumentTitle } from '../../../hooks';



import DataTable from "./DataTable";



export default function Gateway() {
    useDocumentTitle('STUDENTS')

    return (
        <div className="flex justify-stretch flex-col w-full max-h-full">

            <div
                className="card  animated fadeInDown max-h-full
            bg-zinc-600/20
            "
            >
                <DataTable />


            </div>
        </div>
    );
}
