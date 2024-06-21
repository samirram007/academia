import React from 'react'
import * as Yup from "yup";

import {
    useDeleteTransportMutation,
    useStoreTransportMutation,
    useUpdateTransportMutation
} from '../hooks/mutations';
import { useFormik } from 'formik';

import { FormikInputBox } from '../../../components/form-components';
import { FormikTextBox } from '../../../components/form-components/FormikTextBox';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { BuildingSelect } from '../../Common/components/BuildingSelect';
import { FloorSelect } from '../../Common/components/FloorSelect';

import { TransportTypeSelect } from '../../Common/components/TransportTypeSelect';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const transportStoreMutation = useStoreTransportMutation()
    const transportUpdateMutation = useUpdateTransportMutation()
    const transportDeleteMutation = useDeleteTransportMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            transportStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            transportUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            transportDeleteMutation.mutate(values)

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
        <div className='p-2'>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            <FormikInputBox formik={formik} name="name" label="Name" />
                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="registration_no" label="Registration No" />

                        </div>
                        <div>

                            <FormikInputBox formik={formik} type={'date'} name="registration_date" label="Registration Date" />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} type={'date'} name="registration_valid_date" label="Registration valid upto" />
                        </div>
                        <div>
                            <FormikInputBox formik={formik}   name="chasis_no" label="Chasis No" />
                        </div>
                        <div>
                            <FormikInputBox formik={formik}   name="engine_no" label="Engine No" />
                        </div>
                        <div>
                            <FormikInputBox formik={formik}   name="color" label="Color" />
                        </div>
                        <div>
                            <FormikInputBox formik={formik}   name="color" label="Color" />
                        </div>
                        <div>
                            <TransportTypeSelect formik={formik}/>
                        </div>
                        <div className=''>
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