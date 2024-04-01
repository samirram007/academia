import React, { useState } from 'react'
import * as Yup from "yup";
import { useCampuses } from '../../Campus/hooks/queries';
import { useDeleteAcademicSessionMutation, useStoreAcademicSessionMutation, useUpdateAcademicSessionMutation } from '../hooks/mutations';
import { useFormik } from 'formik';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { FormikCheckBox, FormikInputBox } from '../../../components/form-components';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';

const validationSchema = Yup.object().shape({
    session: Yup.string()
        .required("Session is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const academicSessionStoreMutation = useStoreAcademicSessionMutation()
    const academicSessionUpdateMutation = useUpdateAcademicSessionMutation()
    const academicSessionDeleteMutation = useDeleteAcademicSessionMutation()

    const handleFormSubmit = (values) => {
        //  console.log('values',values)
        if (entryMode === 'create') {
            academicSessionStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            console.log('edit', values)
            academicSessionUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {
            console.log('delete', values)
            academicSessionDeleteMutation.mutate(values)

        }
        else {
            console.log('Invalid entry mode')
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
                            <FormikInputBox formik={formik} name="session" label="Session" />

                        </div>
                        <div>
                            <FormikInputBox type="date" formik={formik} name="start_date" label="Start Date" />
                        </div>
                        <div>
                        <FormikInputBox type="date" formik={formik} name="end_date" label="End Date" />
                        </div>
                        <div>

                            <AcademicSessionSelect formik={formik}
                            name="previous_academic_session_id"
                            label={"Previous Academic Session"}
                            exclude={formik.values.id}
                             />
                        </div>
                        <div>

                            <AcademicSessionSelect
                            formik={formik}
                            name="next_academic_session_id"
                            label={"Next Academic Session"}
                            exclude={formik.values.id} />
                        </div>
                    </div>

                    <div className='order-first'>

                        <div className="form-control ">
                            {/* <label className="label cursor-pointer justify-end gap-4"> */}

                            <FormikCheckBox formik={formik} name="is_current" label="Is Current?" />
                            {/* <span className="label-text">Is Current?</span>
                                <input type="checkbox" id="is_current"
                                    name="is_current"
                                    onChange={formik.handleChange}


                                    onBlur={formik.handleBlur}
                                    value={formik.values.is_current}
                                     defaultChecked={formik.values.is_current}
                                    className={`checkbox  m-0 ${formik.errors.is_current ? 'checkbox-error' : 'checkbox-primary'}`} />

                            </label>
                            {formik.errors.is_current ? <div className='text-error'>{formik.errors.is_current}</div> : null} */}
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