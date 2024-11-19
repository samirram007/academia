import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDeleteAcademicSessionMutation, useStoreAcademicSessionMutation, useUpdateAcademicSessionMutation } from '../hooks/mutations';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
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

        if (entryMode === 'create') {
            academicSessionStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            academicSessionUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            academicSessionDeleteMutation.mutate(values)

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
        <div className='pb-10'>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-1 p-2 '>


                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

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


                                <FormikCheckBox formik={formik} name="is_current" label="Is Current?" />
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
        </div>
    )
}

export default EntryForm