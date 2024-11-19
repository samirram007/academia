import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { Flip, toast } from 'react-toastify';
import * as Yup from "yup";

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { useFeeHeads } from '../../FeeHead/hooks/queries';
import { useDeleteFeeMutation, useStoreFeeMutation, useUpdateFeeMutation } from '../hooks/mutations';
const validationSchema = Yup.object().shape({
    total_amount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {


    const feeStoreMutation = useStoreFeeMutation()
    const feeUpdateMutation = useUpdateFeeMutation()
    const feeDeleteMutation = useDeleteFeeMutation()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            feeStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            feeUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            feeDeleteMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const total_amount = values.fee_items.reduce((x, i) => x + parseFloat(i.total_amount), 0)
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
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4 mb-2 '>
                            <div className='grid gap-4 grid-cols-12   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-6 md:col-span-3 '>
                                    <CampusSelect formik={formik} />


                                </div>
                                <div className='col-span-6  md:col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                <div className=' md:col-span-5 '></div>
                                <div className='col-span-6  md:col-span-2 flex flex-col justify-end items-center '>

                                    <FormikInputBox formik={formik} type={"date"} extClass={'align-self-right'} name="fee_date" label="Date" />


                                </div>


                            </div>

                        </div>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='badge badge-success'>Fees</div>
                    </div>
                    <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>
                    <FeeItemNew formik={formik} changes={changes} setChanges={setChanges} />

                    <FeeItems formik={formik} changes={changes} setChanges={setChanges} />

                </div>
                <div className='mx-auto flex flex-col justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
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

export default EntryForm

export const FeeItems = ({ formik, changes, setChanges }) => {
    const [feeItemsData, setFeeItemsData] = useState(formik.values.fee_items)
    useEffect(() => {
        setFeeItemsData(prev => formik.values.fee_items)

    }, [changes]);
    // console.log(formik.values.fee_items);
    return (
        <>


            {
                feeItemsData && feeItemsData.map((fee_item, index) => (
                    <FeeItemRow key={index} fee_item={fee_item} />
                ))
            }


        </>
    )
}

const FeeItemRow = ({ fee_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>{fee_item.fee_head.name}</div>
                <div className='text-right'>{fee_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const FeeItemNew = ({ formik, changes, setChanges }) => {
    const totalAmountRef = useRef()
    const feeHeadRef = useRef()
    const FeeHeadData = useFeeHeads();
    if (FeeHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.fee_items[0], fee_head_id: '', amount: ''}



    const addFee = () => {
        const existingHead = formik.values.fee_items.find(x => x.fee_head_id == feeHeadRef.current.value)

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
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.fee_items.push(initData)
        setChanges(prev => prev + 1)
        // console.log( formik.values.fee_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`fee_items.particulars`} label="" /> */}
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
                    <button type="button" onClick={addFee} className='btn btn-primary btn-sm btn-rounded'>Add</button>
                </div>
            </div>


        </>
    )
}
