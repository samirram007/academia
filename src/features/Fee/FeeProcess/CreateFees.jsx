import moment from "moment";
import { useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";
import { Capitalize } from "../../../libs/utils";
import { useFeeTemplates } from "../../FeeTemplate/hooks/quaries";
import { useStoreStudentFeeMutation } from "../../Student/hooks/mutations";
import { FeeEntryRows } from "./FeeProcess";
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
const CreateFees = ({ userData, selectedStudentSession }) => {

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const [panelToggle, setPanelToggle] = useState(false)
    const [isMount, setIsMount] = useState(false);
    const [feeData, setFeeData] = useState({
        ...defaultFeeData,
        fee_date: moment(new Date()).format('YYYY-MM-DD'),
        academic_class_id: selectedStudentSession.academic_class_id,
        academic_session_id: selectedStudentSession.academic_session_id,
        student_session_id: selectedStudentSession.id,
        campus_id: selectedStudentSession.campus_id,
        student_id: selectedStudentSession.student_id
    })


    const payload = {
        academic_class_id: selectedStudentSession.academic_class_id,
        campus_id: selectedStudentSession.campus_id,
        is_active: 1
    }

    const fetchedFeeTemplatesData = useFeeTemplates(payload)
    if (fetchedFeeTemplatesData.isPending) {
        return <div>Loading...</div>
    }

    const handleToggle = (feeTemplate) => {

        setIsMount(prev => false)
        setFeeData(prev => ({ ...prev, fee_template_id: null }))
        if (!feeTemplate) {
            setPanelToggle(false)
            setSelectedTemplate(null)
            return
        }
        setSelectedTemplate(feeTemplate)
        setPanelToggle(true)
        return
    }

    return (

            <div className='relative flex flex-row gap-6 justify-around px-2 w-[100dvw] max-w-full   h-[90dvh] max-h-full'>
                <div className={`flex overflow-y-auto flex-col  gap-1 border-2 border-rose-600/90 rounded-lg shadow-inner  mb-8 pb-2 `} >
                    <div className='      flex items-center justify-center text-md rounded-t-[2px] py-1 font-bold text-white bg-rose-600/90'>
                        Select Template</div>
                    <div className=' overflow-y-auto flex flex-col  gap-1 pb-16 w-[15dvw]   '>

                        {
                            fetchedFeeTemplatesData.data.data.map((feeTemplate, index) => (
                                <div key={index}
                                    className={`${feeTemplate.id === selectedTemplate?.id ? 'text-red-400 text-[10px]`' : 'text-gray-400 text-[11px]'} w-full  btn btn-link text-wrap   btn-sm `}
                                    onClick={() => handleToggle(feeTemplate)}>
                                    {feeTemplate.name}
                                </div>
                            ))
                        }
                    </div>


                </div>
                {/* <div className={`${panelToggle ? 'flex flex-col gap-2 relative min-w-full' : 'hidden'}`}> */}
                <div className={`flex-1 flex flex-col gap-2 relative border-2 border-rose-800/90 rounded-lg shadow-inner  mb-8 pb-2   `}>

                    <ProcessPanel
                        userData={userData}
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        handleToggle={handleToggle}
                        isMount={isMount}
                        setIsMount={setIsMount}
                        feeData={feeData}
                        setFeeData={setFeeData}
                        selectedStudentSession={selectedStudentSession}
                    />
                </div>
            </div>

    )
}
export default CreateFees
export const ProcessPanel = ({ userData, selectedTemplate, isMount, setIsMount, feeData, setFeeData,
    selectedStudentSession }) => {
    const storeStudentFeeMutation = useStoreStudentFeeMutation()

    const [saveStatus, setSaveStatus] = useState(false);

    const handleSave = () => {

        if (saveStatus) return

        // feeData.total_amount = feeData.fee_items.reduce((total, item) => {
        //     return total + parseFloat(item.total_amount)
        // }, 0)
        feeData.paid_amount = feeData.total_amount
        feeData.balance_amount = feeData.total_amount - feeData.paid_amount


        const payload = {
            fee_no: feeData.fee_no,
            fee_date: moment(feeData.fee_date).format('YYYY-MM-DD'),
            fee_template_id: feeData.fee_template_id,
            student_id: selectedStudentSession.student_id,
            student_session_id: selectedStudentSession.id,
            academic_session_id: selectedStudentSession.academic_session_id,
            academic_class_id: selectedStudentSession.academic_class_id,
            campus_id: selectedStudentSession.campus_id,
            total_amount: feeData.total_amount,
            paid_amount: feeData.paid_amount,
            balance_amount: feeData.balance_amount,
            payment_mode: feeData.payment_mode,
            fee_items: feeData.fee_items.filter(x => x.total_amount > 0 && x.is_active),
        }


        if (payload.fee_items.length == 0) {
            return toast.error("Error in input(s)", { transition: Flip })
        }

        storeStudentFeeMutation.mutate(payload)
        storeStudentFeeMutation.onSuccess;
        {
            setSaveStatus(!saveStatus)
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
                        <button className='badge btn-outline bg-red-400 text-slate-800 font-bold ' onClick={handleSave}>Save</button>
                    }
                    {!selectedTemplate &&
                        <button className='badge  bg-gray-400 text-slate-500 font-bold disabled'  >Save</button>}
                </div>

            </div>
            {
                !selectedTemplate && <div className="text-red-500 flex justify-center items-center h-100 underline decoration-1 font-semibold underline-offset-2 decoration-blue-500">Please select Template</div>
            }
            {
                selectedTemplate && <SelectedTemplatePanel selectedTemplate={selectedTemplate}
                    isMount={isMount} setIsMount={setIsMount} feeData={feeData} setFeeData={setFeeData}
                    selectedStudentSession={selectedStudentSession} />

            }
        </>

    )

}
const SelectedTemplatePanel = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData,
    selectedStudentSession }) => {
    // console.log('object',data)
    const [total, setTotal] = useState(0)
    const [changes, setChanges] = useState(false);

    useEffect(() => {

        if (selectedTemplate != null) {

            if (!isMount) {
                //console.log("IsMount False");
                const thisTotal = selectedTemplate.fee_template_items.reduce((total, item) => {
                    return total + parseFloat(item.amount)
                }, 0)
                setFeeData(prev => ({
                    ...prev, ...selectedTemplate,
                    'fee_template_id': selectedTemplate.id,
                    fee_items: [...selectedTemplate.fee_template_items.map((x, i) => {
                        return ({ ...x, quantity: (x.is_active ? 1 : 0), total_amount: parseFloat(x.amount) * (x.is_active ? 1 : 0) })
                    })],
                    total_amount: thisTotal
                }))
                setTotal(prev => thisTotal)
                setIsMount(true)
            }
            else {

                const thisTotal = feeData.fee_items.reduce((total, item) => {
                    return total + parseFloat(item.amount)
                }, 0)
                setFeeData(prev => ({
                    ...prev,
                    // fee_items: [...feeData.fee_template_items.map(x => ({ ...x, quantity: 1 }))],
                    total_amount: thisTotal
                }))
                setTotal(prev => thisTotal)
            }

        }
    }, [selectedTemplate])
    useEffect(() => {

        if (!changes) return
        const thisTotal = feeData.fee_items.reduce((total, item) => {
            return total + parseFloat(item.total_amount)
        }, 0)
        setFeeData(prev => ({
            ...prev,
            // fee_items: [...feeData.fee_template_items.map(x => ({ ...x, quantity: 1 }))],
            total_amount: thisTotal
        }))
        setTotal(prev => thisTotal)
        setChanges(prev => false)
        return
    }, [changes])
    if (!selectedTemplate) {
        return (<div>Loading...</div>)
    }
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
                    <FeeEntryRows
                        feeData={feeData}
                        setChanges={setChanges}
                        selectedStudentSession={selectedStudentSession}
                        mode='create'
                    />

                </div>
                <div className='sticky w-full bg-violet-400
          text-slate-800 bottom-0 flex flex-row justify-end gap-2
          font-bold border-t-2 border-violet-400/60 py-2'>
                    <span className='w-64 text-right '>{'Total'}:</span>
                    <span className='w-32 text-right pr-2'>{Number(total).toFixed(2)} </span>
                </div>
            </div>


        </>
    )
}