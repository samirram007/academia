import React, { useEffect, useState } from 'react'
import { useFeeTemplates } from '../../FeeTemplate/hooks/quaries'
import { useUpdateStudentFeeMutation } from '../../Student/hooks/mutations'
import { Flip, toast } from "react-toastify";

import { FeeEntryRows } from './FeeProcess'
import moment from 'moment'
import { Capitalize } from '../../../libs/utils'
import { MdOutlineCloseFullscreen } from 'react-icons/md';

const defaultFeeData = {
    fee_no: 'NEW',
    fee_date: new Date(),
    academic_class_id: null,
    academic_session_id: null,
    student_session_id: null,
    fee_template_id: null,
    campus_id: null,
    student_id: null,
    total_amount: 0,
    payment_mode: 'Cash',
    fee_items: [

    ]
}
const EditFees = ({ userData, fees, isOpen, setOpen, selectedStudentSession = fees.student_session }) => {

    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [panelToggle, setPanelToggle] = useState(false)
    const [isMount, setIsMount] = useState(false);
    const [feeData, setFeeData] = useState({
        ...defaultFeeData, ...fees
    })
    const [templateError, setTemplateError] = useState(false)
    const [chosenTemplateItems, setChosenTemplateItems] = useState(null)

    const payload = {
        academic_class_id: selectedStudentSession.academic_class_id,
        campus_id: selectedStudentSession.campus_id,
    }
    const fetchedFeeTemplatesData = useFeeTemplates(payload)
    const mData = fetchedFeeTemplatesData.data?.data ?? [];
    const FeeTemplatesData = mData;//useMemo(() => [...mData], [mData]);


    if (fetchedFeeTemplatesData.isPending) {
        return <div>Loading...</div>
    }
    const handleToggle = (feeTemplate) => {
        if (!checkFeeHeads(feeTemplate.fee_template_items)) return
        setIsMount(prev => false)

        // setFeeData(prev => ({
        //     ...defaultFeeData, ...fees, fee_template_id: feeTemplate.id,fee_template:feeTemplate
        // }))
        const mergedItems = feeTemplate.fee_template_items.map((fee_template_item) => {
            const matchingFeeItem = feeData.fee_items.find((fee_item) => fee_template_item.fee_head_id === fee_item.fee_head_id);
            if (matchingFeeItem) {
                return { ...fee_template_item, ...matchingFeeItem };
            } else {
                return { ...fee_template_item, total_amount: fee_template_item.amount, quantity: fee_template_item.is_active };
            }
        });
        setFeeData(prev => ({
            ...defaultFeeData, ...fees, fee_template_id: feeTemplate.id,fee_template:feeTemplate,
            fee_items: mergedItems
        }))
        if (!feeTemplate) {
            setPanelToggle(false)
            setSelectedTemplate(null)
            return
        }
       // console.log('ft', feeTemplate.id,feeData,feeTemplate)
        setSelectedTemplate(feeTemplate)
        setPanelToggle(true)

        return
    }
    const checkFeeHeads = (feeTemplateItems) => {
        setChosenTemplateItems(null)
        if (feeTemplateItems.length === 0) {
            toast.error('Fee heads not found', { transition: Flip })
            return false
        }
        if (!fees.fee_items.every(item => feeTemplateItems.map(x => x.fee_head_id).includes(item.fee_head_id))) {
            // console.log('Account Head(s) are not Compatible');
            setChosenTemplateItems(feeTemplateItems);
            // setTemplateError(true);
            toast.error('Account Head(s) are not Compatible', { transition: Flip });
            return false;
        }

        return true

    }
    return (<>
        <div className='relative flex flex-row gap-6 justify-around px-2 w-[100dvw] max-w-full   h-[90dvh] max-h-full'>
            {
                chosenTemplateItems &&
                <div className='fixed z-[100] w-[300px] h-[400px]
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white border-2 border-violet-400/10 rounded-lg shadow-inner  '>
                    <div className='border-b-2  border-violet-400/10 bg-violet-400/10 p-2 flex flex-row justify-end items-center'>

                            <button onClick={() => setChosenTemplateItems(null)} type="button"
                                className='rounded-full p-2
 bg-slate-50/5 text-orange-500 cursor-pointer
  hover:text-yellow-500 hover:bg-slate-600
   active:text-orange-600 active:touch-pinch-zoom '>
                                <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                            </button>
                        </div>

                    <div className='w-full mt-4  p-2'>
                            <div className='  text-violet-500 font-bold'>Following Items are Not Available in Chosen Template:</div>
                            <div className='w-full'>
                                {feeData.fee_items
                                    .filter(item => !chosenTemplateItems.some(templateItem => templateItem.fee_head_id === item.fee_head_id && item.total_amount>0))
                                    .map((item, index) => (
                                        <div key={index} className='text-red-500'>{Capitalize(item.fee_head.name)}</div>
                                    ))}
                            </div>
                        </div>

                </div>
            }
            <div className={`flex overflow-y-auto flex-col  gap-1 border-2 border-rose-600/90 rounded-lg shadow-inner  mb-8 pb-2 `} >
                <div className='      flex items-center justify-center text-md rounded-t-[2px] py-1 font-bold text-white bg-rose-600/90'>
                    Select Template {selectedTemplate?.id}</div>
                <div className=' overflow-y-auto flex flex-col  gap-1 pb-16 w-[15dvw]   '>

                    {
                        fetchedFeeTemplatesData.data.data.map((feeTemplate, index) => (
                            <div key={index}
                                className={`${feeTemplate.id === selectedTemplate?.id ? 'text-red-400 text-[10px]`' : 'text-gray-400 text-[9px]'} w-full  btn btn-link text-wrap   btn-sm `}
                                onClick={() => handleToggle(feeTemplate)}>
                                {feeTemplate.name}
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className={`flex-1 flex flex-col gap-2 relative border-2 border-rose-800/90 rounded-lg shadow-inner  mb-8  `}>
                {fetchedFeeTemplatesData.data &&
                    <EditFeesReadyMode
                        userData={userData}
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        FeeTemplatesData={FeeTemplatesData}
                        selectedStudentSession={selectedStudentSession}
                        feeData={feeData}
                        setFeeData={setFeeData}
                        isOpen={isOpen}
                        setOpen={setOpen}
                        isMount={isMount}
                        setIsMount={setIsMount}
                    />
                }
            </div>
        </div>
    </>)

}
export default EditFees
export const EditFeesReadyMode = ({ userData, FeeTemplatesData,  isOpen, setOpen,
    selectedStudentSession, selectedTemplate, setSelectedTemplate,
    feeData, setFeeData,  isMount, setIsMount }) => {


        useEffect(() => {
        setFeeData(prev => ({
            ...prev, ...feeData,
            campus_id: selectedStudentSession.campus_id
        }))
        const tempTemplate = FeeTemplatesData.find(x => x.id === feeData.fee_template_id)
        const updatedTemplate = {
            ...tempTemplate,
            fee_template_items: tempTemplate.fee_template_items.map(item => ({
                ...item,
                amount: "0.00"
            }))
        };
        setSelectedTemplate(prev => updatedTemplate)

    }, [feeData.fee_template_id]);

    return (
        <>
            {
                selectedTemplate &&
                <EditProcessPanel
                    userData={userData}
                    selectedTemplate={selectedTemplate} isMount={isMount}
                    setIsMount={setIsMount} feeData={feeData}
                    setFeeData={setFeeData}
                    isOpen={isOpen} setOpen={setOpen}
                    selectedStudentSession={selectedStudentSession} />
            }


        </>


    )
}
const EditProcessPanel = ({ userData, selectedTemplate, isMount, setIsMount, feeData, setFeeData,
    isOpen, setOpen, selectedStudentSession }) => {
    const updateStudentFeeMutation = useUpdateStudentFeeMutation({ student_session_id: selectedStudentSession.id })
    const [saveStatus, setSaveStatus] = useState(false);

    const handleUpdate = () => {
        // console.log(feeData);
        if (saveStatus) return
        feeData.paid_amount = feeData.total_amount
        feeData.balance_amount = feeData.total_amount - feeData.paid_amount
        const payload = {
            id: feeData.id,
            fee_no: feeData.fee_no,
            fee_date: moment(feeData.fee_date).format('YYYY-MM-DD'),
            fee_template_id: feeData.fee_template_id,
            student_id: feeData.student_id,
            student_session_id: feeData.student_session_id,
            academic_session_id: feeData.academic_session_id,
            academic_class_id: feeData.academic_class_id,
            campus_id: feeData.campus_id,
            total_amount: feeData.total_amount,
            paid_amount: feeData.paid_amount,
            balance_amount: feeData.balance_amount,
            payment_mode: feeData.payment_mode,
            fee_items: feeData.fee_items.filter(x => x.total_amount > 0 && x.is_active),
        }

        if (payload.fee_items.length == 0) {
            return toast.error("Error in input(s)...", { transition: Flip })
        }
        updateStudentFeeMutation.mutate(payload)
        updateStudentFeeMutation.onSuccess;
        {
            setSaveStatus(!saveStatus)
            setOpen(!isOpen)
        }

    }
    return (

        <>
            <div className='flex flex-row justify-between   border-b-[2px] border-red-600/60'>

                <div className='flex-1 flex pr-10 flex-row justify-between gap-2 px-2 py-1 text-sm font-bold '>
                    <div className='flex flex-col gap-1'>
                        <div className="flex flex-row badge gap-0">
                            <span>{Capitalize(userData.user_type)}</span> : <span>{userData.name}</span>
                        </div>
                        <div className="flex flex-row gap-2 badge !ml-0">
                            <span>  <span>{`Class`}</span> : <span>{selectedStudentSession.academic_class.name}</span></span>
                            <span>  <span>{`Section`}</span> : <span>{selectedStudentSession.section.name}</span></span>
                            <span>  <span>{`Roll`}</span> : <span>{selectedStudentSession.roll_no}</span></span>
                        </div>
                        <div className="flex flex-row gap-2 badge !ml-0">
                            <span>  <span>{`Campus`}</span> : <span>{selectedStudentSession.campus.name}</span></span>
                            <span>  <span>{`Session`}</span> : <span>{selectedStudentSession.academic_session.session}</span></span>

                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-0">
                            <span>Fee No.</span>
                            <input type="text" value={feeData.fee_no} onChange={e => setFeeData(prev => ({ ...prev, fee_no: e.target.value }))} className="input input-xs !py-0 input-bordered  w-[100px]" placeholder="Fee No" />

                        </div>
                        <div className="flex flex-col gap-0">
                            <span>Fee Date</span>
                            <input type="date" value={moment(feeData.fee_date).format('YYYY-MM-DD')} onChange={e => setFeeData(prev => ({ ...prev, fee_date: e.target.value }))}
                                className="input input-xs font-semibold input-bordered w-full" placeholder="Fee Date" />
                        </div>
                    </div>
                </div>


                <div className='pr-0'>
                    {selectedTemplate &&
                        <button className='badge btn-outline bg-red-400 text-slate-800 font-bold ' onClick={handleUpdate}>Save</button>}
                </div>

            </div>
            {
                !selectedTemplate && <div className="text-red-500 flex justify-center items-center h-100 underline decoration-1
                font-semibold underline-offset-2 decoration-blue-500">Please select Template</div>
            }
            {
                selectedTemplate && <SelectedTemplatePanelEditMode selectedTemplate={selectedTemplate}
                    isMount={isMount} setIsMount={setIsMount} feeData={feeData} setFeeData={setFeeData}
                    selectedStudentSession={selectedStudentSession} />

            }
        </>

    )
}

const SelectedTemplatePanelEditMode = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData, handleToggle,
    isOpen, setOpen, selectedStudentSession }) => {


    const [total, setTotal] = useState(0)
    const [changes, setChanges] = useState(false);


    useEffect(() => {

        if (selectedTemplate != null) {

            // if (!isMount) {

            const thisTotal = feeData.fee_items.reduce((total, item) => {
                return total + parseFloat(item.total_amount)
            }, 0)
            const mergedItems = selectedTemplate.fee_template_items.map((fee_template_item) => {
                const matchingFeeItem = feeData.fee_items.find((fee_item) => fee_template_item.fee_head_id === fee_item.fee_head_id);
                if (matchingFeeItem) {
                    return { ...fee_template_item, ...matchingFeeItem };
                } else {
                    return { ...fee_template_item, total_amount: fee_template_item.amount, quantity: fee_template_item.is_active };
                }
            });
            setFeeData(prev => ({
                ...prev,
                fee_items: mergedItems
            }))

            setTotal(prev => thisTotal)
            setIsMount(true)


        }
    }, [])
    useEffect(() => {

        if (!changes) return
        const thisTotal = feeData.fee_items.reduce((total, item) => {
            return total + parseFloat(item.total_amount)
        }, 0)
        setFeeData(prev => ({
            ...prev,
            total_amount: thisTotal
        }))
        setTotal(prev => thisTotal)
        setChanges(prev => false)
        return
    }, [changes])


    if (!feeData) {
        return (<div>Loading...</div>)
    }





    return (
        <>

            <div className='relative overflow-y-auto     h-svh max-h-[calc(100% - 200px)]'>
                <div className='px-2 pb-4'>
                    <div className='flex flex-row items-center gap-2 border-b-2 border-violet-400/10 pb-2'>
                        <div className='w-1/12'>SL</div>
                        <div className='w-6/12'>Particulars</div>
                        <div className='w-1/12 text-center'>Quantity</div>
                        <div className='w-1/12'></div>
                        <div className='w-1/12 text-right'>per unit</div>
                        <div className='w-1/12'></div>
                        <div className='w-1/12 text-right'>Amount</div>
                    </div>
                    <FeeEntryRows feeData={feeData} setChanges={setChanges} selectedStudentSession={selectedStudentSession} mode='edit' />

                </div>
                <div className='absolute    w-full bg-violet-400
          text-slate-800 bottom-0 flex flex-row justify-end gap-2
          font-bold border-t-2 border-violet-400/60 py-3 rounded-md'>
                    <span className='w-64 text-right '>{'Total'}:</span>
                    <span className='w-32 text-right pr-2'>{Number(total).toFixed(2)} </span>
                </div>
            </div>


        </>
    )
}

