import * as Yup from "yup";

import { Field, useFormik } from 'formik';
import {
    useDeleteExaminationTypeMutation,
    useStoreExaminationTypeMutation,
    useUpdateExaminationTypeMutation
} from '../hooks/mutations';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSelect } from "@/components/form-components/FormikSelect";


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

    const options =[
        {
            id:1,
            name:"false",
            val:false
        },
        {
            id:2,
            name:"true",
            val:true
        }
    ]


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            <FormikInputBox formik={formik}  name="name" label="Examination Type" />
                        </div>

                        <div>
                        <FormikSelect formik={formik} name="is_promotional_exam" label="Promotional Exam"
                                options={
                                    Object.entries(options).map(([key, value], index) => (
                                        <option className="text-white" key={index} value={value.val}>{value.name}</option>
                                    ))
                                }
                                />
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