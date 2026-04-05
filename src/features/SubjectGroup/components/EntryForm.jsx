import * as Yup from "yup";

import { useFormik } from 'formik';
import {
    useDeleteSubjectGroupMutation,
    useStoreSubjectGroupMutation,
    useUpdateSubjectGroupMutation
} from '../hooks/mutations';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikTextBox } from '@/components/form-components/FormikTextBox';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const subjectGroupStoreMutation = useStoreSubjectGroupMutation()
    const subjectGroupUpdateMutation = useUpdateSubjectGroupMutation()
    const subjectGroupDeleteMutation = useDeleteSubjectGroupMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            subjectGroupStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            subjectGroupUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {

            subjectGroupDeleteMutation.mutate(values)

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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        <FormikInputBox formik={formik} name="name" label="SubjectGroup" />
                    </div>
                    <div>
                        <FormikInputBox formik={formik} name="code" label="Code" />
                    </div>
                    <div className='md:col-span-2'>
                        <FormikTextBox formik={formik} name="description" label="Description" />
                    </div>
                </div>

                <div className='flex flex-col gap-3 mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/60'>
                    {entryMode === 'delete' && (
                        <p className='text-sm text-red-500 dark:text-red-400 text-center'>Are you sure you want to delete this entry?</p>
                    )}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${entryMode === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {formik.isSubmitting && (
                            <span className='inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin' />
                        )}
                        {entryMode === 'delete' ? 'Delete' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EntryForm