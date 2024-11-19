import { useFormik } from 'formik';
import * as Yup from "yup";
import {
    useDeleteFeeTemplateItemMutation,
    useStoreFeeTemplateItemMutation,
    useUpdateFeeTemplateItemMutation
} from '../../FeeTemplateItem/hooks/mutations';


import { FormikCheckBox } from '@/components/form-components/FormikCheckBox';
import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FeeHeadSelect } from '../../Common/components/FeeHeadSelect';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
})

const EntryForm = ({ initialValues, entryMode, setEntryId }) => {


    const feeTemplateItemStoreMutation = useStoreFeeTemplateItemMutation()
    const feeTemplateItemUpdateMutation = useUpdateFeeTemplateItemMutation()
    const feeTemplateItemDeleteMutation = useDeleteFeeTemplateItemMutation()

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            feeTemplateItemStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            feeTemplateItemUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            feeTemplateItemDeleteMutation.mutate(values)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handleFormSubmit(values)
            setEntryId(0)
        }

    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {formik.values.keys}
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>

                                <div className='col-span-12  md:col-span-2'>

                                    <FormikInputBox formik={formik} type={'number'} name="sort_index" label="SL NO" />
                                </div>
                                <div className='col-span-12 md:col-span-3 '>
                                    <FeeHeadSelect formik={formik} auto={false} />
                                </div>
                                <div className='col-span-12  md:col-span-3 '>
                                    <FormikInputBox formik={formik} name="name" label="Printable Name" />
                                </div>
                                <div className='col-span-12  md:col-span-4 '>
                                    <FormikInputBox formik={formik} name="amount" label="Fees Amount" />

                                </div>
                                <div className='col-span-12  md:col-span-2'>
                                    <FormikCheckBox formik={formik} name="is_active" label="Is Active?" />

                                </div>
                                <div className='col-span-12  md:col-span-3'>
                                    <FormikCheckBox formik={formik} name="is_customizable" label="Is Customizable?" />

                                </div>
                                <div className='col-span-12  md:col-span-3'>

                                    <FormikCheckBox formik={formik} name="keep_periodic_details" label="Keep Periodic Details?" />

                                </div>
                                <div className='col-span-12  md:col-span-4'>
                                    {entryMode === 'create' &&
                                        <button type="submit"
                                            className='btn btn-primary w-full'>
                                            {'Add'}


                                            {formik.isSubmitting && (
                                                <span
                                                    className='spinner-border spinner-border-sm ms-2'
                                                    role='status'
                                                    aria-hidden='true'
                                                ></span>
                                            )}
                                        </button>
                                    }
                                    {entryMode === 'edit' &&
                                        <div div className='flex flex-row gap-4'>

                                            <button type="submit"
                                                className='btn btn-primary w-1/2'>
                                                {'Update'}


                                                {formik.isSubmitting && (
                                                    <span
                                                        className='spinner-border spinner-border-sm ms-2'
                                                        role='status'
                                                        aria-hidden='true'
                                                    ></span>
                                                )}
                                            </button>
                                            <button type="button"
                                            onClick={()=>setEntryId(0)}
                                                className='btn btn-primary w-1/3'>
                                                Reset
                                            </button>
                                        </div>

                                    }



                                </div>
                            </div>
                            <div className='order-first'>




                            </div>
                        </div>
                    </div>
                </div>
                <div className='mx-auto flex flex-col justify-center items-center '>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>

                </div>
            </form>
        </div>
    )
}

export default EntryForm