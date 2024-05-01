import React, { useState } from 'react'
import * as Yup from "yup";
import { useCampuses } from '../../Campus/hooks/queries';
import { useDeleteAcademicClassMutation, useStoreAcademicClassMutation, useUpdateAcademicClassMutation } from '../hooks/mutations';
import { useFormik } from 'formik';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { FormikCheckBox, FormikInputBox } from '../../../components/form-components';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const academicClassStoreMutation = useStoreAcademicClassMutation()
    const academicClassUpdateMutation = useUpdateAcademicClassMutation()
    const academicClassDeleteMutation = useDeleteAcademicClassMutation()

    const handleFormSubmit = (values) => {

        if (entryMode === 'create') {
            academicClassStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            academicClassUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            academicClassDeleteMutation.mutate(values)

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

                            <CampusSelect formik={formik} />
                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="name" label="Class" />

                        </div>
                        <div>
                            <FormikInputBox type="date" formik={formik} name="start_date" label="Start Date" />
                        </div>
                        <div>
                        <FormikInputBox type="date" formik={formik} name="end_date" label="End Date" />
                        </div>

                    </div>

                    <div className='order-first'>

                        <div className="form-control ">

                        </div>


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