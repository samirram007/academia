import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import { useDeleteExpenseMutation, useStoreExpenseMutation, useUpdateExpenseMutation } from '../hooks/mutations';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';
import { FormikCheckBox, FormikInputBox, FormikSubmit } from '../../../components/form-components';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {


    const expenseStoreMutation = useStoreExpenseMutation()
    const expenseUpdateMutation = useUpdateExpenseMutation()
    const expenseDeleteMutation = useDeleteExpenseMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            expenseStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            expenseUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            useDeleteExpenseMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            handleFormSubmit(values)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-6   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-6 md:col-span-3 '>
                                    <CampusSelect formik={formik} />


                                </div>
                                <div className='col-span-6  md:col-span-3 '>

                                    <AcademicSessionSelect formik={formik} campus_id={formik.values.campus_id} />

                                </div>
                                <div className='col-span-6  md:col-span-3 '>

                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />


                                </div>
                                <div className='col-span-6  md:col-span-3 '>

                                    <FormikInputBox formik={formik} name="name" label="Fee Template" />


                                </div>


                            </div>
                            <div className='order-first'>

                                    <div className="form-control ">


                                        <FormikCheckBox formik={formik} name="is_active" label="Is Active?" />
                                    </div>


                                </div>
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