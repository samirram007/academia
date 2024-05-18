/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

import axiosClient from '../../../utils/axios-client';
import { useDocumentTitle } from '../../../hooks'



import { useStudents } from "../hooks/queries";
import DataTable from "./DataTable";



export default function DataList() {
    useDocumentTitle('STUDENTS')

    return (
        <div className="flex justify-stretch flex-col w-full overflow-y-auto">

            <div
                className="card  animated fadeInDown
            bg-zinc-600/20
            "
            >
                <DataTable />


            </div>
        </div>
    );
}
