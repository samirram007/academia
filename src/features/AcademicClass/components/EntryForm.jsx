import { useFormik } from 'formik';
import * as Yup from "yup";
import { CampusSelect } from '../../Common/components/CampusSelect';
import { useDeleteAcademicClassMutation, useStoreAcademicClassMutation, useUpdateAcademicClassMutation } from '../hooks/mutations';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { AcademicStandardSelect } from '../../Common/components/AcademicStandardSelect';


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
                            <AcademicStandardSelect formik={formik} />
                        </div>

                        <div>
                            <FormikInputBox formik={formik} name="name" label="Name" />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="code" label="Code" />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} type="number" name="capacity" label="Capacity" />

                        </div>

                    </div>

                    <div className='order-first'>

                        <div className="form-control ">

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
    )
}

export default EntryForm