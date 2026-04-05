import * as Yup from "yup";

import { useFormik } from 'formik';
import {
    useDeleteExaminationTypeMutation,
    useStoreExaminationTypeMutation,
    useUpdateExaminationTypeMutation
} from '../hooks/mutations';

import { FormikCheckBox } from "@/components/form-components/FormikCheckBox";
import { FormikInputBox } from '@/components/form-components/FormikInputBox';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Examination Type is required"),

})

const EntryForm = ({ initialValues, entryMode }) => {

    const examinationTypeStoreMutation = useStoreExaminationTypeMutation()
    const examinationTypeUpdateMutation = useUpdateExaminationTypeMutation()
    const examinationTypeDeleteMutation = useDeleteExaminationTypeMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            examinationTypeStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            examinationTypeUpdateMutation.mutate(values)

        } else if (entryMode === 'delete') {
            examinationTypeDeleteMutation.mutate(values)

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


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 justify-center'>

                        <div>
                            <FormikInputBox formik={formik} name="name" label="Examination Type" />
                        </div>

                        <div className="flex flex-col">
                            <FormikCheckBox formik={formik} name="is_promotional_exam" type={"checkbox"} label="Promotional Exam" />
                            {/* <FormikSelect formik={formik} name="is_promotional_exam" label="Promotional Exam"
                                options={
                                    Object.entries(options).map(([key, value], index) => (
                                        <option className="text-white" key={index} value={value.val}>{value.name}</option>
                                    ))
                                }
                                /> */}
                        </div>

                        {/* <div>
                            <label htmlFor="">Is Promotional Exam</label>
                            <div>
                                <Field formik={formik} type="checkbox" name="is_promotional_exam" />
                            </div>
                        </div> */}

                    </div>

                    <div className='order-first'>




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