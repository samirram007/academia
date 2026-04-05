/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */





import { UserTable } from ".";
import { useDocumentTitle } from "../../hooks";
import { useUsers } from "../../hooks/queries";
import axiosClient from "../../utils/axios-client";


export default function Users () {
    useDocumentTitle('USERS')

    const usersData =  useUsers()


    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${u.id}`).then(() => {
            // TODO: show notification
            usersData.data
        });
    };
    if (usersData.isLoading) {
        return (<div className="w-full h-full flex justify-center items-center">
            <h1 className="text-4xl">Loading...</h1>
        </div>)
    }
    if (usersData.isError) {

        return (<div className="w-full h-full flex justify-center items-center">
            <h1 className="text-4xl">Error...</h1>
        </div>)
    }


    return (
        <div className="flex justify-stretch flex-col w-full overflow-y-auto">

            <div
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 shadow-sm rounded-2xl overflow-hidden"
            >
                <UserTable />


            </div>
        </div>
    );
}
