import React from 'react'
import * as Yup from "yup";

import {
    useDeleteRoomMutation,
    useStoreRoomMutation,
    useUpdateRoomMutation
} from '../hooks/mutations';
import { useFormik } from 'formik';

import { FormikInputBox } from '../../../components/form-components';
import { FormikTextBox } from '../../../components/form-components/FormikTextBox';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { BuildingSelect } from '../../Common/components/BuildingSelect';
import { FloorSelect } from '../../Common/components/FloorSelect';
import { RoomSelect } from '../../Common/components/RoomSelect';
import { RoomTypeSelect } from '../../Common/components/RoomTypeSelect';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const roomStoreMutation = useStoreRoomMutation()
    const roomUpdateMutation = useUpdateRoomMutation()
    const roomDeleteMutation = useDeleteRoomMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            roomStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            roomUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            roomDeleteMutation.mutate(values)

        }
        else {
            console.info('Invalid entry mode')
        }
    }



    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            handleFormSubmit(values)
        },
    });


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            <FormikInputBox formik={formik} name="name" label="Room" />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="code" label="Code" />

                        </div>
                        <div>
                            <CampusSelect formik={formik}/>
                        </div>
                        <div>
                            <BuildingSelect formik={formik}/>
                        </div>
                        <div>
                            <FloorSelect formik={formik}/>
                        </div>
                        <div>
                            <RoomTypeSelect formik={formik}/>
                        </div>
                        <div className='md:col-span-2'>
                            <FormikInputBox formik={formik} name="capacity" label="Capacity" />


                        </div>

                    </div>

                    <div className='order-first'>




                    </div>
                </div>

                <div className='mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>
                    <button type="submit" className='btn btn-primary btn-wide'>
                        {entryMode === 'delete' ? 'Delete' : 'Save'}
                        {formik.isSubmitting && (
                            <span
                                className='spinner-border spinner-border-sm ms-2'
                                role='status'
                                aria-hidden='true'
                            ></span>
                        )}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default EntryForm