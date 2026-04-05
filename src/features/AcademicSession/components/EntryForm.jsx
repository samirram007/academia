import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDeleteAcademicSessionMutation, useStoreAcademicSessionMutation, useUpdateAcademicSessionMutation } from '../hooks/mutations';

import { FormikCheckBox } from '@/components/form-components/FormikCheckBox';
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

                    <div className='flex flex-col gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60'>
                        <div className='flex gap-2 items-center text-red-600'>

                            {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                        </div>
                        <button type="submit" className='inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'>
                            {entryMode === 'delete' ? 'Delete' : 'Save'}
                            {formik.isSubmitting && (
                                <span
                                    className='inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'
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