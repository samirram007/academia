import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { LuLoader } from 'react-icons/lu';
import { Flip, toast } from 'react-toastify';
import * as Yup from "yup";

import MultiInputBox from '@/components/form-components/MultiInputBox';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
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

    const computedTotal = formik.values.expense_items.reduce((acc, item) => acc + (parseFloat(item.total_amount) || 0), 0)

    return (
        <div className='w-full'>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                <div className='rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-800/40 p-4'>
                    <div className='flex flex-col lg:flex-row gap-4 lg:items-end'>
                        <div className='w-full lg:w-1/3'>
                            <FormikInputBox formik={formik} type={"text"} name="voucher_no" label="Voucher No" />
                        </div>
                        <div className='w-full lg:flex-1 grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <AcademicSessionSelect formik={formik} />
                            <FormikInputBox formik={formik} type={"date"} name="expense_date" label="Date" />
                        </div>
                    </div>
                </div>

                <div className='rounded-xl border border-slate-200 dark:border-slate-700/60 overflow-hidden'>
                    <div className='px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/60'>
                        <h3 className='text-sm font-semibold text-slate-700 dark:text-slate-200'>Expense Items</h3>
                    </div>
                    <div className='grid grid-cols-6 gap-4 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700/60'>
                        <div className='col-span-4'>Particulars</div>
                        <div className='text-right'>Amount</div>
                        <div className='text-center'>Action</div>
                    </div>

                    <div className='px-4 py-2'>
                        <ExpenseItems formik={formik} changes={changes} setChanges={setChanges} />
                        {!confirm && (
                            addMore ? (
                                <ExpenseItemNew formik={formik} changes={changes} setChanges={setChanges} setAddMore={setAddMore} />
                            ) : (
                                <div className='flex flex-row gap-2 justify-end py-3'>
                                    <button
                                        type='button'
                                        onClick={() => setAddMore(true)}
                                        className='inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                                    >
                                        Add More
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setConfirm(true)}
                                        className='inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors'
                                    >
                                        Confirm Items
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className='sticky bottom-0 z-10 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-4 py-3'>
                    <div className='flex items-center justify-between border-b border-slate-200 dark:border-slate-700/60 pb-3 mb-3'>
                        <span className='text-sm font-semibold text-slate-600 dark:text-slate-300'>Total</span>
                        <span className='text-lg font-bold text-slate-800 dark:text-slate-100'>{computedTotal.toFixed(2)}</span>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-3 lg:items-end'>
                        <div className='flex-1'>
                            <MultiInputBox formik={formik} name="narration" label="Remarks" />
                        </div>
                        <div className='flex flex-col items-end gap-2'>
                            {entryMode === 'delete' && (
                                <div className='text-xs text-red-500'>Are your sure you want to delete this entry?</div>
                            )}
                            <button type="submit" className='inline-flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'>
                                {entryMode === 'delete' ? 'Delete' : 'Confirm'}
                                {formik.isSubmitting && (
                                    <span
                                        className='inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'
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

            <div className='grid grid-cols-6 gap-4 border-b border-slate-200 dark:border-slate-700/60 py-2'>
                <div className='col-span-4'>{expense_item.expense_head.name}</div>
                <div className='text-right'>{expense_item.total_amount}</div>
                <div className='text-center'><button type="button" className='text-xs text-slate-400 cursor-not-allowed' disabled>Edit</button></div>
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


            <div className='grid grid-cols-12 gap-4 border-b border-slate-200 dark:border-slate-700/60 py-2'>
                <div className='col-span-4'>
                    {/* <FormikInputBox formik={formik} type={"text"} name={`expense_items.particulars`} label="" /> */}
                    {/* <input                className={`  input mb-0 input-bordered input-primary    ${formik.errors[name]? 'input-error' : ''}`}/> */}
                    <select ref={expenseHeadRef}
                        onChange={handleDropdownChange}
                        className='w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40'
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
                    <input
                        type={"number"}
                        ref={totalAmountRef}
                        step={"100"}
                        className='w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40'
                    />
                </div>

                <div className='text-center col-span-2'>
                    <button type="button" onClick={addExpense} className='inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors'>Set</button>
                </div>
            </div>


        </>
    )
}
