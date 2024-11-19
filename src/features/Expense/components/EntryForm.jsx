import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { Flip, toast } from 'react-toastify';
import * as Yup from "yup";

import MultiInputBox from '@/components/form-components/MultiInputBox';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { useExpenseHeads } from '../../ExpenseHead/hooks/queries';
import { useDeleteExpenseMutation, useStoreExpenseMutation, useUpdateExpenseMutation } from '../hooks/mutations';
const validationSchema = Yup.object().shape({
    total_amount: Yup.string()
        .required("Amount is required"),
})

const EntryForm = ({ initialValues, entryMode }) => {

    const [addMore, setAddMore] = useState(true)
    const [confirm, setConfirm] = useState(false)
    const [total, setTotal] = useState(0)
    const expenseStoreMutation = useStoreExpenseMutation()
    const expenseUpdateMutation = useUpdateExpenseMutation()
    const expenseDeleteMutation = useDeleteExpenseMutation()
    const [changes, setChanges] = useState(0);
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            expenseStoreMutation.mutate(values)

        } else if (entryMode === 'edit') {
            expenseUpdateMutation.mutate(values)
        } else if (entryMode === 'delete') {
            expenseDeleteMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            const total_amount = values.expense_items.reduce((x, i) => x + parseFloat(i.total_amount), 0)
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
                                    <CampusSelect formik={formik} />


                                </div>

                                <div className=' md:col-span-6 '></div>
                                <div className='col-span-6  md:col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                <div className='col-span-6  md:col-span-2 flex flex-col justify-end items-center '>

                                    <FormikInputBox formik={formik} type={"date"} extClass={'align-self-right'} name="expense_date" label="Date" />


                                </div>


                            </div>

                        </div>
                    </div>
                    <div className='flex flex-row justify-center'>
                        <div className='badge badge-success'>Expenses</div>
                    </div>
                    <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>
                    <ExpenseItems formik={formik} changes={changes} setChanges={setChanges} setTotal={setTotal} />

                    {

                        !confirm &&
                        (addMore ?
                            <ExpenseItemNew formik={formik} changes={changes} setChanges={setChanges} setAddMore={setAddMore} />
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
                            <MultiInputBox name="remarks" label="Remarks"></MultiInputBox>
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

export const ExpenseItems = ({ formik, changes, setChanges }) => {
    const [expenseItemsData, setExpenseItemsData] = useState(formik.values.expense_items)
    useEffect(() => {
        setExpenseItemsData(prev => formik.values.expense_items)

    }, [changes]);
    // console.log(formik.values.expense_items);
    return (
        <>


            {
                expenseItemsData && expenseItemsData.map((expense_item, index) => (
                    <ExpenseItemRow key={index} expense_item={expense_item} />
                ))
            }


        </>
    )
}

const ExpenseItemRow = ({ expense_item }) => {

    return (
        <>

            <div className='grid grid-cols-6 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>{expense_item.expense_head.name}</div>
                <div className='text-right'>{expense_item.total_amount}</div>
                <div className='text-center'><button type="button">Edit</button></div>
            </div>

        </>
    )
}
const HTMLContent = ({ htmlString }) => (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
);
export const ExpenseItemNew = ({ formik, changes, setChanges, setAddMore }) => {
    const totalAmountRef = useRef()
    const expenseHeadRef = useRef()
    const ExpenseHeadData = useExpenseHeads({ expense_group_id: [4] });
    if (ExpenseHeadData.isLoading) return <LuLoader />;
    // const initData={...formik.initialValues.expense_items[0], expense_head_id: '', amount: ''}



    const addExpense = () => {
        const existingHead = formik.values.expense_items.find(x => x.expense_head_id == expenseHeadRef.current.value)

        let errorString = ""
        if (existingHead) {
            errorString += "<p>Duplicate Entry</p>"
        }
        if (expenseHeadRef.current.value <= 0) {
            errorString += "<p>Expense head is required</p>"
        }
        if (totalAmountRef.current.value <= 0) {
            errorString += "<p>Amount is required</p>"
        }
        if (errorString.length > 0) {
            toast.info(<HTMLContent htmlString={errorString} />, { transition: Flip })
            return
        }

        const initData = {
            expense_head_id: parseFloat(expenseHeadRef.current.value),
            expense_head: ExpenseHeadData.data.data.find(x => x.id == expenseHeadRef.current.value),
            quantity: 1,
            amount: parseFloat(totalAmountRef.current.value),
            total_amount: parseFloat(totalAmountRef.current.value)
        }

        formik.values.expense_items.push(initData)
        setChanges(prev => prev + 1)

        setAddMore(false)
        // console.log( formik.values.expense_items);

    }
    const handleDropdownChange = (event) => {

        const { name, value } = event.target;
        // console.log(name, value);
    }

    return (
        <>


            <div className='grid grid-cols-12 gap-5 border-b-2   border-blue-300/30 pb-2 px-4 mb-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`expense_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={expenseHeadRef}
                        onChange={handleDropdownChange}

                        className={`select  w-full  select-primary`}
                    >
                        <option value='0'      >-- please select</option>
                        {
                            ExpenseHeadData.data.data &&
                            ExpenseHeadData.data.data.map(({ id: key, name: value }, index) => (
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
                    <button type="button" onClick={addExpense} className='btn btn-primary btn-sm btn-rounded'>Set</button>
                </div>
            </div>


        </>
    )
}
