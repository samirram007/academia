import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { Flip, toast } from 'react-toastify';
import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { useFeeHeads } from '../../FeeHead/hooks/queries';
import {
    useDeleteTransportFeeMutation,
    useStoreTransportFeeMutation, useUpdateTransportFeeMutation
} from '../hooks/mutations';
const validationSchema = Yup.object().shape({
    user_id: Yup.number()
        .required("User is required"),

})
const InputForm = ({ initialValues, entryMode, selectedTransportUserPanel,
    selectedTransportUser, defaultMonthlyCharge, setDefaultMonthlyCharge }) => {
    console.log('iv', initialValues);
    const transportFeeStoreMutation = useStoreTransportFeeMutation()
    const transportFeeUpdateMutation = useUpdateTransportFeeMutation()
    const transportFeeDeleteMutation = useDeleteTransportFeeMutation()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            transportFeeStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            transportFeeUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            transportFeeDeleteMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues: {
            ...initialValues,
            user_id: selectedTransportUser.user_id,
            transport_id: selectedTransportUser.transport_id,
            transport_user_id: selectedTransportUser.id,
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const total_amount = values.transport_fee_items.reduce((x, i) => x + parseFloat(i.total_amount), 0)
            if (total_amount == 0) {
                toast.info(<HTMLContent htmlString={'Please add some item'} />, { transition: Flip })
                return
            }
            values.total_amount = total_amount
            values.paid_amount = total_amount
            values.balance_amount = 0
            handleFormSubmit(values)
        }
    })

    return (
        <div className='w-100 mx-auto'>
            <div className='flex flex-row justify-center -mt-4'>
                <div className='badge badge-success'>Transport Fees</div>
            </div>
            <div className='flex flex-row justify-between'>
                <div>
                    {selectedTransportUserPanel}
                </div>
                <div className='hidden overflow-scroll flex-1 text-wrap '>
                    {JSON.stringify(initialValues)}
                    {JSON.stringify(formik.values.user_id)}
                </div>
                <div className='grid grid-cols-4 justify-end items-end'>
                    <div className='col-span-4 flex flex-col gap-2 pr-4 '>
                        <div className='flex flex-row items-center gap-2'>
                            <AcademicSessionSelect formik={formik}
                                label={'Session'} is_current={true} />
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <CampusSelect formik={formik} />
                        </div>
                        <div className='flex flex-row items-center  gap-2'>
                            <FormikInputBox formik={formik}
                                type={"date"} extClass={'align-self-right'}
                                name="fee_date" label="Date" />
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>



                    <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 my-2'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>
                    <TransportFeeItemNew formik={formik} changes={changes} setChanges={setChanges} />

                    <TransportFeeItems formik={formik} changes={changes} setChanges={setChanges} />

                </div>
                <div className='absolute bottom-0 w-full
                mx-auto flex flex-col justify-center items-center
                border-t-2 border-blue-300/10  py-3 '>
                    <div className='flex gap-2 items-center text-red-600'>

                        {entryMode === 'delete' && "Are your sure you want to delete this entry?"}
                    </div>
                    <button type="submit" className='btn btn-primary btn-wide'>
                        {entryMode === 'delete' ? 'Delete' : 'Confirm'}
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


export const TransportFeeItems = ({ formik, changes, setChanges }) => {
    const [transportFeeItemsData, setTransportFeeItemsData] = useState(formik.values.transport_fee_items)
    useEffect(() => {
        setTransportFeeItemsData(prev => formik.values.transport_fee_items)

    }, [changes]);
    // console.log(formik.values.transport_fee_items);
    return (
        <>


            {
                transportFeeItemsData && transportFeeItemsData.map((transport_fee_item, index) => (
                    <TransportFeeItemRow key={index} transport_fee_item={transport_fee_item} />
                ))
            }


        </>
    )
}

const TransportFeeItemRow = ({ transport_fee_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>{transport_fee_item.fee_head.name}</div>
                <div className='text-right'>{transport_fee_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const TransportFeeItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const feeHeadRef = useRef()
    const FeeHeadData = useFeeHeads({ income_group_ids: [3] });
    if (FeeHeadData.isLoading) return <LuLoader2 />;
    // const initData={...formik.initialValues.transport_fee_items[0], fee_head_id: '', amount: ''}



    const addTransportFee = () => {
        const [quantity, setQuantity] = useState(1)
        const existingHead = formik.values.transport_fee_items.find(x => x.fee_head_id == feeHeadRef.current.value)

        let errorString = ""
        if (existingHead) {
            errorString += "<p>Duplicate Entry</p>"
        }
        if (feeHeadRef.current.value <= 0) {
            errorString += "<p>Fee head is required</p>"
        }
        if (totalAmountRef.current.value <= 0) {
            errorString += "<p>Amount is required</p>"
        }
        if (errorString.length > 0) {
            toast.info(<HTMLContent htmlString={errorString} />, { transition: Flip })
            return
        }

        const initData = {
            fee_head_id: parseFloat(feeHeadRef.current.value),
            fee_head: FeeHeadData.data.data.find(x => x.id == feeHeadRef.current.value),
            quantity: quantity,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: quantity * parseFloat(totalAmountRef.current.value)
        }

        formik.values.transport_fee_items.push(initData)
        setChanges(prev => prev + 1)
        // console.log( formik.values.transport_fee_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`transport_fee_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={feeHeadRef}
                        onChange={handleDropdownChange}

                        className={`select  w-full  select-primary`}
                    >
                        <option value='0'      >-- please select</option>
                        {
                            FeeHeadData.data.data &&
                            FeeHeadData.data.data.map(({ id: key, name: value }, index) => (
                                <option key={index} value={key}>{value}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='col-span-4'></div>
                <div className='text-right col-span-2'>
                    <input type={"number"} ref={totalAmountRef} step={"100"} className={`  input mb-0 input-bordered input-primary  `} />
                </div>

                <div className='text-center col-span-2'>
                    <button type="button" onClick={addTransportFee} className='btn btn-primary btn-sm btn-rounded'>Add</button>
                </div>
            </div>


        </>
    )
}