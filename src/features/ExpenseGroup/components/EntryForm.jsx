import { useFormik } from 'formik';
import * as Yup from "yup";


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useStoreExpenseGroupMutation, useUpdateExpenseGroupMutation } from '../hooks/mutations';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {


    const expenseGroupStoreMutation = useStoreExpenseGroupMutation()
    const expenseGroupUpdateMutation = useUpdateExpenseGroupMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            expenseGroupStoreMutation.mutate(values)

        } else {

            expenseGroupUpdateMutation.mutate(values)

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
        <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1  '>
                <div className='grid grid-flow-row    gap-5'>
                    <div className='grid gap-4 col-span-6 md:col-span-4 border-b-2    border-blue-300/30 pb-2 px-4 mb-2 '>
                        <div className='grid gap-4 grid-cols-6    pb-2  mb-2'>
                            <div className='col-span-6  '>

                                <FormikInputBox formik={formik} name="name" label="Name" />



                                <div className='mx-auto flex justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                                    <FormikSubmit formik={formik} label="Save" />

                                </div>

                            </div>


                        </div>




                    </div>



                </div>

                <div className='order-first'>

                    <div className="form-control ">
                        {/* <FormikCheckBox formik={formik} name="is_current" type={"checkbox"} label="Is Current?" /> */}

                    </div>


                </div>
            </div>


        </form>
    )
}

export default EntryForm