/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

import axiosClient from '../../../axios-client';
import { useDocumentTitle } from '../../../hooks'

import { useUsers } from "../../../hooks/queries";
import { UserTable } from ".";


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
        <div className="flex justify-stretch flex-col w-full px-4 overflow-y-auto">

            <div
                className="card  animated fadeInDown
            bg-zinc-600/20
            "
            >
                <UserTable />


            </div>
        </div>
    );
}
