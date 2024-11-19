import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from "yup";

import { FormikCheckBox } from '@/components/form-components/FormikCheckBox';
import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { JourneyTypeSelect } from '../../Common/components/JourneyTypeSelect';
import { TransportSelect } from '../../Common/components/TransportSelect';
import { useDeleteTransportUserMutation, useStoreTransportUserMutation, useUpdateTransportUserMutation } from '../hooks/mutations';
const validationSchema = Yup.object().shape({
    user_id: Yup.number()
        .required("User is required"),

})
const InputForm = ({ initialValues,   entryMode,defaultMonthlyCharge,setDefaultMonthlyCharge }) => {
    const transportStoreMutation = useStoreTransportUserMutation()
    const transportUpdateMutation = useUpdateTransportUserMutation()
    const transportDeleteMutation = useDeleteTransportUserMutation()
        const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            transportStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {

            transportStoreMutation.mutate(values)

        } else if (entryMode === 'delete') {

            transportDeleteMutation.mutate(values)

        }
        else {
            console.info('Invalid entry mode')
        }
    }

// console.log(initialValues);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {

            handleFormSubmit(values)
        },
    });
    useEffect(()=>{

        if(formik.values.is_free)
            {
                setDefaultMonthlyCharge(prev=>formik.values.monthly_charge)
                formik.setFieldValue('monthly_charge',0)}
        else{
            // setDefaultMonthlyCharge(prev=>formik.values.monthly_charge)
                formik.setFieldValue('monthly_charge',defaultMonthlyCharge)

        }
    },[formik.values.is_free])
    return (
        <div className='p-2'>

            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1 p-2 '>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>

                        <div>
                            <TransportSelect formik={formik} name={'transport_id'} label={'Transport'}/>

                        </div>
                        <div>
                            <JourneyTypeSelect formik={formik} name={'journey_type_id'} label={'Journey Type'} />

                        </div>
                        <div>
                            <FormikInputBox formik={formik} name="join_date" type={"date"}  label={'Join Date'}  />
                            </div>
                        <div className=''>
                            <FormikInputBox formik={formik} type={'number'} name="monthly_charge" step={100} label="Monthly Charge" />

                        </div>

                    </div>



                    <div className='order-first'>

                        <div className="form-control flex flex-row gap-4 justify-end items-center ">
                            <FormikCheckBox formik={formik} name="is_free" type={"checkbox"} label="Is Free?" />
                            <FormikCheckBox formik={formik} name="is_active" type={"checkbox"} label="Is Active?" />

                        </div>


                    </div>
                </div>

                <div className=' absolute bottom-0  w-full
bg-blue-400/5
mx-auto flex flex-col justify-center items-center border-t-2
 border-blue-300/10 mt-2 py-3'>
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

export default InputForm
