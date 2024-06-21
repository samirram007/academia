import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStudentSessionFees } from '../../../StudentSession/hooks/queries'
import { useFormModal } from '../../../../contexts/FormModalProvider'
import { IoMdAdd } from 'react-icons/io'
import FormikFormModal from '../../../../components/form-components/FormikFormModal'
import PrintToPdf from '../print/PrintToPdf'
import { DateTime } from 'luxon'
import { TbCalendarMonth, TbCheck } from 'react-icons/tb'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
import { useStoreStudentFeeMutation, useUpdateStudentFeeMutation } from '../../hooks/mutations'
import FormikEditFormModal from '../../../../components/form-components/FormikEditFormModal'
import { useFeeTemplates } from '../../../FeeTemplate/hooks/quaries'
import moment from 'moment'
import MonthModal from './MonthModal'
import { useMonths } from '../../../Common/hooks/quaries'
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


export const FeeProcess = ({
    data,
    academicSessions,
    selectedSession,
    selectedStudentSession }) => {
    const fetchedSessionFeesData = useStudentSessionFees({ student_session_id: selectedStudentSession.id })

    if (fetchedSessionFeesData.isPending) return <div>Loading</div>

    const mData = fetchedSessionFeesData.data?.data ?? [];
    const StudentSessionFeesData = mData//useMemo(() => [...mData], [mData]);
   //  console.log('sss',selectedStudentSession)

    if (!selectedStudentSession) {
        return (
            <div className='p-4 flex justify-center items-center text-2xl bg-slate-600 mt-4 rounded-lg h-40'>
                {'Student Session Not Initialize.....'}
            </div>
        )
    }
    return (
        <>
            <InitFeeProcess data={data}
                academicSessions={academicSessions}
                selectedSession={selectedSession}
                selectedStudentSession={selectedStudentSession}
                StudentSessionFeesData={StudentSessionFeesData} />
        </>
    )

}



export const InitFeeProcess = ({
    data,
    academicSessions,
    selectedSession,
    selectedStudentSession,StudentSessionFeesData }) => {
    const { isOpen, setOpen } = useFormModal()
    const session_id = selectedSession.id

    //console.log('selc',selectedStudentSession);
   // return <>Fees for Session {academicSessions.find(x => x.id === selectedSession.id).session}</>
    return (
        <>

            <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
                <div className='flex flex-row justify-between items-center pr-8'>
                    <div className='font-bold text-xl text-red-300'>
                        Fees for Session {academicSessions.find(x => x.id === selectedSession.id)?.session}
                    </div>
                    <button onClick={() => setOpen(true)} title='Create new'
                        className="btn btn-primary btn-sm text-xl
                                  btn-rounded-symbol border-blue-300/10">
                        <IoMdAdd />
                    </button>
                </div>

                {
                    isOpen &&
                    <>
                        <FormikFormModal label={'Fees'}>
                            <CreateFees data={data} selectedStudentSession={selectedStudentSession} />
                        </FormikFormModal>
                    </>
                }
                <div className='grid grid-cols-9 font-semibold text-primary  items-center border-b-2 border-violet-500  '>
                    <div className='text-center border-r-2 border-violet-500'>Receipt No.</div>
                    <div>Date</div>
                    <div className='col-span-2'>Particulars</div>
                    <div>Amount</div>
                    <div>Mode</div>
                    <div>Status</div>
                    <div className='col-span-2 text-center'>Action</div>

                </div>
                <div>
                    {
                            !StudentSessionFeesData ?
                                <div className='grid grid-cols-9 items-center py-1 border-b-2 border-violet-400/20 '>

                                    <div className='col-span-9 text-center'>{'-- No Data Found --'}</div>
                                </div>
                                :
                                StudentSessionFeesData.map((fees, index) => (
                                     <FeeGrid key={index} fees={fees} selectedStudentSession={selectedStudentSession} session_id={session_id} />
                                )
                            )
                        }
                </div>
            </div>
        </>
    )
}
export const FeeGrid = ({ fees, selectedStudentSession, session_id }) => {


    return (
        <>
            <div className='grid grid-cols-9 items-center py-1 text-xs border-b-2 border-violet-400/20 '>
                <div className='flex items-center justify-center  text-center  border-r-2 border-violet-500/10'>{fees.fee_no}</div>
                <div>  {DateTime.fromISO(fees.fee_date).toLocaleString(DateTime.DATE_MED)}</div>
                <div className='col-span-2'>{fees.fee_template.name}</div>
                <div>{fees.paid_amount}</div>
                <div>{fees.payment_mode}</div>
                <div>{fees.balance_amount > 0 ? 'Due' : 'Paid'}</div>
                <div className='flex flex-row justify-center gap-2 col-span-2'>

                    {
                        fees && fees.fee_items.length > 0 &&
                        <>
                            <FeeItems fees={fees} selectedStudentSession={selectedStudentSession} session_id={session_id} />
                            <PrintToPdf fees={fees} selectedStudentSession={selectedStudentSession} session_id={session_id} />
                        </>
                    }


                </div>
            </div>
        </>
    )
}
export const FeeItems = ({ fees, selectedStudentSession, session_id }) => {
    const [isOpen, setOpen] = useState(false)
    // console.log('ss', selectedStudentSession, session_id)
    return (
        <>
            <button onClick={() => setOpen(true)} className='btn btn-outline text-xs btn-primary btn-sm btn-rounded py-0 '>{'Details'}</button>
            {
                isOpen &&
                <>
                    <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Edit Academic Session">
                        <EditFees
                            fees={fees}
                            isOpen={isOpen}
                            setOpen={setOpen}
                            selectedStudentSession={selectedStudentSession}
                            session_id={session_id} />
                    </FormikEditFormModal>
                </>
            }
        </>
    )
}


export const PdfFees = ({ fees, isOpen, setOpen, session_id }) => {


    // Create styles
    const styles = StyleSheet.create({

        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        title: {
            fontSize: 24,
            textAlign: 'center',
            fontFamily: 'Oswald'
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
            fontFamily: 'Oswald'
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman'
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: 'center',
            color: 'grey',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    });
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [panelToggle, setPanelToggle] = useState(false)
    const [isMount, setIsMount] = useState(false);
    const [feeData, setFeeData] = useState(defaultFeeData)
    const academic_session_id = fees.academic_session_id
    const academic_class_id = fees.academic_class_id
    const campus_id = fees.academic_class.campus_id
    const student_id = fees.student.id

    const payload = {
        academic_session_id, academic_class_id, campus_id
    }
    const fetchedFeeTemplatesData = useFeeTemplates(payload)

    const handleToggle = (feeTemplate) => {

        setIsMount(prev => false)
        setFeeData(prev => defaultFeeData)
        if (!feeTemplate) {
            setPanelToggle(false)
            setSelectedTemplate(null)
            return
        }
        setSelectedTemplate(feeTemplate)
        setPanelToggle(true)

        return
    }
    useEffect(() => {
        setFeeData(prev => ({
            ...prev, ...fees,
            campus_id: campus_id
        }))
        const tempTemplate = fetchedFeeTemplatesData.data && fetchedFeeTemplatesData.data.data.find(x => x.id === fees.fee_template_id)
        setSelectedTemplate(prev => tempTemplate)

    }, []);
    if (fetchedFeeTemplatesData.isPending) {
        return <div>Loading...</div>
    }
    if (fetchedFeeTemplatesData.isFetched) {
        // console.log("SelectedFees",selectedTemplate)
    }





    return (<>


        <div className='flex flex-row w-[80dvw] max-w-full   h-[70dvh] max-h-full'>
            <div className={`${!panelToggle ? 'relative flex flex-col min-w-full gap-2' : 'hidden'} `}>
                <Document>
                    <Page size="A5" orientation='landscape' style={styles.page}>
                        <View style={styles.section}>
                            <Text>Section #1</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
                {/*selectedTemplate && <SelectedPanelEditMode
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            handleToggle={handleToggle}
            student_id={student_id}
            isMount={isMount}
            setIsMount={setIsMount}
            feeData={feeData}
            setFeeData={setFeeData}
            isOpen={isOpen}
            setOpen={setOpen}
            session_id={session_id}
          />} */}
            </div>
        </div>
    </>)

}
export const EditFees = ({ fees, isOpen, setOpen, selectedStudentSession=fees.student_session, session_id }) => {

    const academic_session_id = fees.academic_session_id
    const academic_class_id = fees.academic_class_id
    const campus_id = fees.academic_class.campus_id
    const is_active = true


    const payload = {
        academic_class_id, campus_id
    }
    const fetchedFeeTemplatesData = useFeeTemplates(payload)
    const mData = fetchedFeeTemplatesData.data?.data ?? [];
    const FeeTemplatesData = mData;//useMemo(() => [...mData], [mData]);


    if (fetchedFeeTemplatesData.isPending) {
        return <div>Loading...</div>
    }





    return (<>
        {fetchedFeeTemplatesData.data &&
            <EditFeesReadyMode
                FeeTemplatesData={FeeTemplatesData}
                selectedStudentSession={selectedStudentSession}
                fees={fees}
                isOpen={isOpen}
                setOpen={setOpen}
                session_id={session_id}
            />
        }
    </>)

}

export const EditFeesReadyMode = ({ FeeTemplatesData, fees, isOpen, setOpen, session_id, selectedStudentSession }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [panelToggle, setPanelToggle] = useState(false)
    const [isMount, setIsMount] = useState(false);
    const [feeData, setFeeData] = useState(defaultFeeData)
    const academic_session_id = fees.academic_session_id
    const academic_class_id = fees.academic_class_id
    const campus_id = fees.academic_class.campus_id
    const student_id = fees.student.id

    const handleToggle = (feeTemplate) => {

        setIsMount(prev => false)
        setFeeData(prev => defaultFeeData)
        if (!feeTemplate) {
            setPanelToggle(false)
            setSelectedTemplate(null)
            return
        }
        setSelectedTemplate(feeTemplate)
        setPanelToggle(true)

        return
    }

    useEffect(() => {
        setFeeData(prev => ({
            ...prev, ...fees,
            campus_id: campus_id
        }))
        const tempTemplate = FeeTemplatesData.find(x => x.id === fees.fee_template_id)
        setSelectedTemplate(prev => tempTemplate)
        // console.log('aaa');
    }, []);

    // useEffect(() => {
    //     console.log(selectedTemplate)

    // }, [selectedTemplate])


    return (
        <>
            <div className='flex flex-row w-[80dvw] max-w-full   h-[70dvh] max-h-full'>
                <div className={`${!panelToggle ? 'relative flex flex-col min-w-full gap-2' : 'hidden'} `}>

                    {selectedTemplate &&
                        <SelectedPanelEditMode
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            handleToggle={handleToggle}
                            student_id={student_id}
                            isMount={isMount}
                            setIsMount={setIsMount}
                            feeData={feeData}
                            setFeeData={setFeeData}
                            isOpen={isOpen}
                            setOpen={setOpen}
                            session_id={session_id}
                            selectedStudentSession={selectedStudentSession}
                        />}
                </div>
            </div>
        </>
    )
}


const SelectedPanelEditMode = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData, handleToggle,
    student_id, isOpen, setOpen, session_id, selectedStudentSession }) => {



    const updateStudentFeeMutation = useUpdateStudentFeeMutation({ student_session_id: session_id })
    const [total, setTotal] = useState(0)
    const [changes, setChanges] = useState(false);
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

            // }
            // else {
            //   console.log("IsMount True",feeData,selectedTemplate);
            //   const thisTotal = feeData.fee_items.reduce((total, item) => {
            //     return total + parseFloat(item.amount)
            //   }, 0)
            //   setFeeData(prev => ({
            //     ...prev,
            //    fee_items: [...feeData.fee_template_items.map(x => ({ ...x, quantity: 1 }))],
            //     total_amount: thisTotal
            //   }))
            //   setTotal(prev => thisTotal)
            // }

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
            <div className='flex flex-row justify-between mt-2 pb-2 border-b-4 border-violet-400/60'>
                <div className='flex flex-row items-center justify-center '>
                    <div className='font-bold'> {selectedTemplate && selectedTemplate.name}</div>
                    <span className='hidden ml-4 w-6 h-6 text-4xl
            flex flex-row justify-center items-center
            cursor-pointer rounded-full
                   border-2 border-violet-600 bg-violet-600/50 text-violet-300
                   hover:bg-violet-600/30 hover:text-red-800
                    ' onClick={() => handleToggle(null)}>
                        <CgArrowsExchangeAltV />
                    </span>
                </div>
                <div className='pr-6'>
                    <button className='btn btn-outline btn-primary btn-sm btn-rounded' onClick={handleUpdate}>Update</button>
                </div>

            </div>
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
                    <FeeEntryRows feeData={feeData} setChanges={setChanges} selectedStudentSession={selectedStudentSession} />

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

const FeeEntryRows = ({ feeData, setChanges, selectedStudentSession }) => {

    return (
        feeData.fee_items && feeData.fee_items.map((feeTemplateItem, index) => (

            <FeeEntryRow key={index} index={index}
                feeTemplateItem={feeTemplateItem}
                selectedStudentSession={selectedStudentSession}
                setChanges={setChanges}
                mode={'edit'}
            />

        ))
    )
}

export const CreateFees = ({ data, selectedStudentSession }) => {

    const [selectedTemplate, setSelectedTemplate] = useState(null)

    const [panelToggle, setPanelToggle] = useState(false)
    const [isMount, setIsMount] = useState(false);
    const [feeData, setFeeData] = useState(defaultFeeData)

    const academic_session_id = selectedStudentSession.academic_session_id
    const academic_class_id = selectedStudentSession.academic_class_id
    const campus_id = selectedStudentSession.campus_id
    const student_id = data.id

    const payload = {
        academic_class_id, campus_id, is_active:1
    }

    const fetchedFeeTemplatesData = useFeeTemplates(payload)
    if (fetchedFeeTemplatesData.isPending) {
        return <div>Loading...</div>
    }

    const handleToggle = (feeTemplate) => {

        setIsMount(prev => false)
        setFeeData(prev => defaultFeeData)
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
        <>
            <div className='relative flex flex-row w-[80dvw] max-w-full   h-[90dvh] max-h-full'>
                <div className={`${!panelToggle ? 'flex overflow-y-auto flex-col w-full min-w-80 gap-2' : 'hidden'} `}>
                   <div className=' px-32 flex flex-col  gap-2 pb-16'>
                    {
                        fetchedFeeTemplatesData.data.data.map((feeTemplate, index) => (
                            <div key={index} className='w-full  btn btn-primary btn-sm text-sm'
                                onClick={() => handleToggle(feeTemplate)}>
                                {feeTemplate.name}
                            </div>
                        ))
                    }
                   </div>

                    <div className='b-0 w-full  p-2 bg-rose-600/90 flex
                    items-center justify-center text-xl
                    rounded-[20px] bottom-0 absolute'>
                        Choose your Template</div>
                </div>
                <div className={`${panelToggle ? 'flex flex-col gap-2 relative min-w-full' : 'hidden'}`}>
                    <SelectedPanel
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        handleToggle={handleToggle}
                        student_id={student_id}
                        isMount={isMount}
                        setIsMount={setIsMount}
                        feeData={feeData}
                        selectedStudentSession={selectedStudentSession}
                        setFeeData={setFeeData}
                    />
                </div>
            </div>
        </>
    )
}

const SelectedPanel = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData, handleToggle,
    student_id, selectedStudentSession }) => {
    const storeStudentFeeMutation = useStoreStudentFeeMutation()
    const [total, setTotal] = useState(0)
    const [changes, setChanges] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false);

    const handleSave = () => {

        if (saveStatus) return
        feeData.paid_amount = feeData.total_amount
        feeData.balance_amount = feeData.total_amount - feeData.paid_amount

        //return
        const payload = {
            fee_no: feeData.fee_no,
            fee_date: moment(feeData.fee_date).format('YYYY-MM-DD'),
            fee_template_id: feeData.fee_template_id,
            student_id: feeData.student_id,
            student_session_id: selectedStudentSession.id,
            academic_session_id: feeData.academic_session_id,
            academic_class_id: feeData.academic_class_id,
            campus_id: feeData.campus_id,
            total_amount: feeData.total_amount,
            paid_amount: feeData.paid_amount,
            balance_amount: feeData.balance_amount,
            payment_mode: feeData.payment_mode,
            fee_items: feeData.fee_items.filter(x => x.total_amount > 0 && x.is_active),
        }
        // console.log(payload)
        if (payload.fee_items.length == 0) {
            return toast.error("Error in input(s)", { transition: Flip })
        }

        storeStudentFeeMutation.mutate(payload)
        storeStudentFeeMutation.onSuccess;
        {
            setSaveStatus(!saveStatus)
        }

    }

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
                    student_id: student_id,
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
            <div className='flex flex-row justify-between mt-2 pb-2 border-b-4 border-violet-400/60'>
                <div className='flex flex-row items-center justify-center '>
                    <div className='font-bold'> {selectedTemplate && selectedTemplate.name}</div>
                    <span className='ml-4 w-6 h-6 text-4xl
            flex flex-row justify-center items-center
            cursor-pointer rounded-full
                   border-2 border-violet-600 bg-violet-600/50 text-violet-300
                   hover:bg-violet-600/30 hover:text-red-800
                    ' onClick={() => handleToggle(null)}>
                        <CgArrowsExchangeAltV />
                    </span>
                </div>
                <div className='pr-6'>
                    <button className='btn btn-outline btn-primary btn-sm btn-rounded' onClick={handleSave}>Save</button>
                </div>

            </div>
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
                    {
                        feeData.fee_items && feeData.fee_items.map((feeTemplateItem, index) => (

                            <FeeEntryRow key={index} index={index}
                                feeTemplateItem={feeTemplateItem}
                                selectedStudentSession={selectedStudentSession}
                                setChanges={setChanges}
                                mode='create'
                            />

                        ))
                    }
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
export const FeeEntryRow = ({ feeTemplateItem, index, setChanges, selectedStudentSession, mode }) => {
    //  console.log("EachRows", feeTemplateItem)
    const quantityRef = useRef()
    const amountRef = useRef()
    const [currentQuantity, setCurrentQuantity] = useState(feeTemplateItem.quantity)

    const feeTemplateItemData = useMemo(() => {
        return { ...feeTemplateItem }
    }, [JSON.stringify(feeTemplateItem)])
    const handleChange = (e) => {

        //console.log(e.target.value)
        setTimeout(() => {
            feeTemplateItem.amount = amountRef.current.value
            // feeTemplateItem.quantity = quantityRef.current.value
            //feeTemplateItem.total_amount = parseInt(quantityRef.current.value) * parseFloat(amountRef.current.value)
            feeTemplateItem.total_amount = parseInt(feeTemplateItem.amount) * feeTemplateItem.quantity
            setChanges(true)
        }, 700);
    }

    return (
        <>

            <div className={`${feeTemplateItemData.is_active ? '' : 'bg-slate-800/20 text-slate-700'} flex flex-row  items-center gap-2 border-b-2 border-violet-400/10 pb-2`}>
                <div className='w-1/12'>{index + 1}.</div>
                <div className='w-6/12 flex flex-row items-center gap-2'>
                    {feeTemplateItemData.fee_head.name}
                    {feeTemplateItemData.keep_periodic_details
                        ? <MonthPanel selectedStudentSession={selectedStudentSession}
                            currentQuantity={currentQuantity}
                            setCurrentQuantity={setCurrentQuantity}
                            feeTemplateItem={feeTemplateItem}
                            setChanges={setChanges}
                            mode={mode}
                        />
                        : ''}
                </div>
                <div className='w-1/12 text-center'>

                    <input ref={quantityRef} onChange={handleChange}
                        className={`${feeTemplateItemData.is_customizable ? '' : ''} ${feeTemplateItemData.quantity == 0 ? 'opacity-20' : ''} input w-12 text-center mb-0 border-violet-400/30 active:input-bordered input-primary py-0 px-1 h-6`}
                        disabled
                        type="text" name="quantity[]" value={feeTemplateItemData.quantity} />
                </div>
                <div className='w-1/12 text-right'></div>
                <div className='w-1/12   flex flex-row justify-end'>
                    <input ref={amountRef}
                        disabled={!feeTemplateItemData.is_customizable}
                        className={`${feeTemplateItemData.is_customizable ? '' : ''} ${feeTemplateItemData.amount == 0 ? 'opacity-20' : ''} input w-28 text-right mb-0 border-slate-200/80 active:input-bordered input-primary py-0 px-1 h-6`}
                        onChange={handleChange}
                        type="text" name="amount[]" defaultValue={feeTemplateItemData.amount} />
                </div>
                <div className='w-1/12 text-right'>:</div>
                <div className='w-1/12 text-right'>{Number(parseFloat(feeTemplateItemData.total_amount)).toFixed(2)}</div>
            </div>
        </>
    )
}
export const MonthPanel = ({ selectedStudentSession, feeTemplateItem, currentQuantity, setCurrentQuantity, setChanges, mode }) => {

    const fetchMonths = useMonths()
    const mData = fetchMonths.data?.data ?? [];
    const months = useMemo(() => [...mData], [mData]);
    if (fetchMonths.isFetching) return <div>Loading</div>

    return (
        <>
            {

                <LoadMonthPanel months={months}
                    selectedStudentSession={selectedStudentSession}
                    feeTemplateItem={feeTemplateItem}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                    setChanges={setChanges}
                    mode={mode}
                />
            }


        </>
    )
}

export const LoadMonthPanel = ({ months, selectedStudentSession, feeTemplateItem, currentQuantity,
    setCurrentQuantity, setChanges, mode }) => {
    // console.log('sss', selectedStudentSession);
    const [isOpen, setOpen] = useState(false);
    const [existingMonths, setExistingMonths] = useState([]);
    const [currentMonths, setCurrentMonths] = useState([]);
    //const currentMonths=[1]
    //console.log('sel',selectedStudentSession);

    useEffect(() => {

        if (selectedStudentSession.fee_item_months.length == 0) {
            setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
            setCurrentMonths(prev => [1])
            setChanges(prev => true)
        }
        else if (feeTemplateItem.quantity == 0) {
            setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
            setCurrentMonths(prev => [selectedStudentSession.fee_item_months.length + 1])
            setChanges(prev => true)
        }
        else if (feeTemplateItem.quantity > 0) {
            // const newArray=[]
            // for(let i=selectedStudentSession.fee_item_months.length+1;
            //     i<=selectedStudentSession.fee_item_months.length + feeTemplateItem.quantity;i++){
            //         newArray.push(i)
            //     }

            // setCurrentMonths(prev => newArray)

            if (mode == 'create') {
                setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id))
                setCurrentMonths(prev => [...Array(feeTemplateItem.quantity)]
                    .map((_, index) => (selectedStudentSession.fee_item_months.length + 1) + index))
            }
            else if (mode == 'edit') {
                // console.log(mode, feeTemplateItem.fee_item_months.map(a => a.month_id));
                // console.log(selectedStudentSession.fee_item_months.map(x => x.month_id).filter(x => !feeTemplateItem.fee_item_months.map(a => a.id).includes(x)));
                // console.log(selectedStudentSession.fee_item_months.map(x => x.month_id   &&  !feeTemplateItem.fee_item_months.map(a=a.month_id).includes(x.id)))
                setExistingMonths(prev => selectedStudentSession.fee_item_months.map(x => x.month_id).filter(x => !feeTemplateItem.fee_item_months.map(a => a.month_id).includes(x)))
                setCurrentMonths(feeTemplateItem.fee_item_months.map(a => a.month_id))
            }

            setChanges(prev => true)
        }
    }, []);


    return (
        <>
            <button onClick={() => setOpen(true)} className='cursor-pointer'><TbCalendarMonth /></button>

            {currentMonths.length > 0 && months.filter(x => currentMonths.includes(x.id))
                .map((x, index) => {
                    return <div key={index} className='border-2 px-2 rounded-xl border-blue-400/50'>{x.short_name}</div>
                }
                )}

            {isOpen &&
                <CallMonthModal monthData={months}
                    selectedStudentSession={selectedStudentSession}
                    existingMonths={existingMonths}
                    currentMonths={currentMonths}
                    setCurrentMonths={setCurrentMonths}
                    feeTemplateItem={feeTemplateItem}
                    isOpen={isOpen} setOpen={setOpen}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                    setChanges={setChanges}
                />
            }
        </>
    )
}

export const CallMonthModal = (
    {
        monthData,
        isOpen,
        setOpen,
        selectedStudentSession,
        existingMonths,
        currentMonths,
        feeTemplateItem,
        setCurrentMonths,
        currentQuantity, setCurrentQuantity,
        setChanges
    }) => {
    const handleClick = (selectedMonth) => {
        //  console.log(selectedMonth,currentMonths[currentMonths.length - 1])
        //console.log(selectedMonth,currentMonths[currentMonths.length-1])
        if (selectedMonth === currentMonths[currentMonths.length - 1] + 1) {
            setChanges(prev => true)
            setCurrentMonths(prev => [...prev, selectedMonth])
            return
        }
        else if (selectedMonth === currentMonths[currentMonths.length - 1] && currentMonths.length > 1) {
            setChanges(prev => true)
            setCurrentMonths(prev => prev.filter(x => x != selectedMonth))
            return
        }

    }
    useEffect(() => {
        setCurrentQuantity(prev => currentMonths.length)
        feeTemplateItem.quantity = currentMonths.length
        feeTemplateItem.total_amount = parseFloat(feeTemplateItem.amount) * currentMonths.length
    }, [currentMonths])

    return (
        <MonthModal isOpen={isOpen} setOpen={setOpen} label={`Session: ${selectedStudentSession.academic_session.session}`}>
            <div className='flex flex-row bg-slate-800/60 rounded-md shadow-inner w-[20dvw] max-w-full   h-[50dvh] max-h-full pb-[2px]'>
                <div className={`relative flex flex-row justify-center items-center flex-wrap min-w-full gap-2 p-2 bg-slate-800  text-slate-700'`}>

                    {
                        monthData && monthData.map((month, index) => (

                            month.id > 0 &&
                                existingMonths.includes(month.id)
                                ?
                                <div key={index} className=' cursor-pointer w-16 h-16 border-2
                                bg-slate-400
                         text-slate-800 rounded-lg flex flex-col justify-start items-center font-bold shadow-lg'>
                                    <div className=' text-blue-800'> {month.short_name}</div>
                                    <div>
                                        {/* <span className='flex text-xs justify-center items-center'>PAID<TbCheck size={20}/></span> */}
                                        {existingMonths.includes(month.id) &&
                                            <TbCheck className='text-green-800 drop-shadow-2xl text-4xl ' size={20} />}
                                    </div>
                                </div>
                                :

                                (

                                    currentMonths.includes(month.id) ?

                                        <div key={index} className=' cursor-pointer w-16 h-16 border-2 bg-blue-400
                                     rounded-lg flex flex-col gap-0 justify-start items-center text-sky-800 font-semibold
                                     active:bg-blue-600 active:translate-x-1 transition-colors select-none

                                     '
                                            onClick={() => { handleClick(month.id) }}
                                        >
                                            <div className='text-[16px]'> {month.short_name}</div>
                                            <div>{currentMonths.includes(month.id) &&
                                                <TbCheck size={30} className='text-sky-800 drop-shadow-2xl text-2xl ' />}</div>
                                        </div>
                                        :
                                        <div key={index} className=' cursor-pointer w-16 h-16 border-2 bg-slate-100
                                text-slate-800 rounded-lg flex flex-col justify-start items-center'
                                            onClick={() => handleClick(month.id)}
                                        >
                                            <div> {month.short_name}</div>
                                            <div>{existingMonths.includes(month.id) && <TbCheck size={20} />}</div>
                                        </div>


                                )



                        ))
                    }
                </div>
            </div>
        </MonthModal>
    )

}


