import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { Flip, toast } from 'react-toastify';
import * as Yup from "yup";

import MultiInputBox from '@/components/form-components/MultiInputBox';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { useExaminationHeads } from '../../ExaminationHead/hooks/queries';
import { useDeleteExaminationMutation, useStoreExaminationMutation, useUpdateExaminationMutation } from '../hooks/mutations';
const validationSchema = Yup.object().shape({
    total_amount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {

    const [addMore, setAddMore] = useState(true)
    const [confirm, setConfirm] = useState(false)
    const [total, setTotal] = useState(0)
    const examinationStoreMutation = useStoreExaminationMutation()
    const examinationUpdateMutation = useUpdateExaminationMutation()
    const examinationDeleteMutation = useDeleteExaminationMutation()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            examinationStoreMutation.mutate(values)

        } else if (entryMode === 'edit') {
            examinationUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            examinationDeleteMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const total_amount = values.examination_items.reduce((x, i) => x + parseFloat(i.total_amount), 0)
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
                            <div className='grid gap-4 grid-cols-12  md:grid-cols-12  mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-6 md:col-span-2 '>
                                    <FormikInputBox formik={formik} type={"text"} extClass={'align-self-right'} name="voucher_no" label="Voucher No" />


                                </div>

                                <div className=' md:col-span-6 '></div>
                                <div className='col-span-6  md:col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                <div className='col-span-6  md:col-span-2 flex flex-col justify-end items-center '>

                                    <FormikInputBox formik={formik} type={"date"} extClass={'align-self-right'} name="examination_date" label="Date" />


                                </div>


                            </div>

                        </div>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='badge badge-success'>Examinations</div>
                    </div>
                    <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>
                    <ExaminationItems formik={formik} changes={changes} setChanges={setChanges} setTotal={setTotal} />

                    {

                        !confirm &&
                        (addMore ?
                            <ExaminationItemNew formik={formik} changes={changes} setChanges={setChanges} setAddMore={setAddMore} />
                            :

                            (<div className='flex flex-row gap-4 justify-end p-4'>
                                <div onClick={() => setAddMore(true)} className='btn btn-primary'>Add More</div>
                                <div onClick={() => setConfirm(true)} className='btn btn-primary'>Confirm</div>
                            </div>)
                        )


                    }




                </div>
                <div className='fixed-bottom'>

                    <div className='border-t-2 border-primary flex flex-row justify-between'>
                        <div >Total:</div><div>{total}</div>
                    </div>

                    <div className='flex flex-row '>
                        <div className='remarks-box flex-1 px-6'>
                            <MultiInputBox formik={formik} name="narration" label="Remarks" />
                        </div>
                        <div className='mx-auto flex flex-col 
                        justify-end items-center border-t-2 border-blue-300/10 mt-2 
                        pb-2 pt-6'>
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
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EntryForm

export const ExaminationItems = ({ formik, changes, setChanges }) => {
    const [examinationItemsData, setExaminationItemsData] = useState(formik.values.examination_items)
    useEffect(() => {
        setExaminationItemsData(prev => formik.values.examination_items)

    }, [changes]);
    // console.log(formik.values.examination_items);
    return (
        <>


            {
                examinationItemsData && examinationItemsData.map((examination_item, index) => (
                    <ExaminationItemRow key={index} examination_item={examination_item} />
                ))
            }


        </>
    )
}

const ExaminationItemRow = ({ examination_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>{examination_item.examination_head.name}</div>
                <div className='text-right'>{examination_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const ExaminationItemNew = ({ formik, changes, setChanges, setAddMore }) => {
    const totalAmountRef = useRef()
    const examinationHeadRef = useRef()
    const ExaminationHeadData = useExaminationHeads({ examination_group_id: [4] });
    if (ExaminationHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.examination_items[0], examination_head_id: '', amount: ''}



    const addExamination = () => {
        const existingHead = formik.values.examination_items.find(x => x.examination_head_id == examinationHeadRef.current.value)

        let errorString = ""
        if (existingHead) {
            errorString += "<p>Duplicate Entry</p>"
        }
        if (examinationHeadRef.current.value <= 0) {
            errorString += "<p>Examination head is required</p>"
        }
        if (totalAmountRef.current.value <= 0) {
            errorString += "<p>Amount is required</p>"
        }
        if (errorString.length > 0) {
            toast.info(<HTMLContent htmlString={errorString} />, { transition: Flip })
            return
        }

        const initData = {
            examination_head_id: parseFloat(examinationHeadRef.current.value),
            examination_head: ExaminationHeadData.data.data.find(x => x.id == examinationHeadRef.current.value),
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.examination_items.push(initData)
        setChanges(prev => prev + 1)

        setAddMore(false)
        // console.log( formik.values.examination_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`examination_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={examinationHeadRef}
                        onChange={handleDropdownChange}

                        className={`select  w-full  select-primary`}
                    >
                        <option value='0'      >-- please select</option>
                        {
                            ExaminationHeadData.data.data &&
                            ExaminationHeadData.data.data.map(({ id: key, name: value }, index) => (
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
                    <button type="button" onClick={addExamination} className='btn btn-primary btn-sm btn-rounded'>Set</button>
                </div>
            </div>


        </>
    )
}
