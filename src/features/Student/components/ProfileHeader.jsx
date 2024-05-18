import { DateTime } from 'luxon'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { StudentSessions } from '../../StudentSession'
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useStudentSessionFees, useStudentSessions } from '../../StudentSession/hooks/queries';
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import { TbCalendarMonth } from "react-icons/tb";

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


import FormikFormModal from '../../../components/form-components/FormikFormModal';
import { useFormModal } from '../../../contexts/FormModalProvider';
import { useFeeTemplate, useFeeTemplates } from '../../FeeTemplate/hooks/quaries';
import { fetchFeeTemplates } from '../../FeeTemplate/services/apis';
import { useStoreStudentFeeMutation, useUpdateStudentFeeMutation } from '../hooks/mutations';
import moment from 'moment';
import { Flip, toast } from 'react-toastify';
import FormikEditFormModal from '../../../components/form-components/FormikEditFormModal';
import PdfModal from '../../../components/form-components/PdfModal';
import { useReactToPrint } from 'react-to-print';
import PrintToPdf from './print/PrintToPdf';
const ProfileHeader = (data) => {

  const [activeView, setActiveView] = useState('fee')
  // const [studentData, setStudentData] = useState(data.data)
  return (
    <>

      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800'>

        <div className='flex justify-between items-center'>
          <div >
            <div className='text-xl pl-1 mb-2'>
              Name: {data.data.student.name}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row items-center w-max mb-2 bg-yellow-400 px-2 rounded-2xl shadow-md border-2 border-white/20'>


                <SessionsDropdown session_id={data.data.academic_session.id} student_id={data.data.student.id} />
                <div>
                </div>
              </div>
              <div className='flex flex-row'>
                <div className='bg-green-500 font-semibold text-sm px-2 rounded-2xl shadow-md border-2
                 border-white/20 text-green-900'>
                  Class: {'' + data.data.academic_class.name} | Section: {'' + data.data.academic_class.code} | Roll No: {'' + data.data.roll_no}
                </div>
                {/* Edit Icon */}
                <div className='cursor-pointer flex  justify-between items-center rounded-full  ml-2'>
                  <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
                </div>
              </div>
            </div>
          </div>
          <div className='w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>
            <img src={data.data.student.profile_document.path} className='w-full h-full' />
          </div>

        </div>

      </div>
      {/* <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800 mt-2'>
        Session
      </div> */}
      <div className='h-42 w-full bg-gradient-to-r  from-blue-500 to-cyan-500 rounded-md p-4 text-slate-800 mt-2'>
        <ul className='flex flex-row gap-4 cursor-pointer text-sm'>
          <li className={`${activeView === 'profile' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('profile')}>Profile</li>
          <li className={`${activeView === 'address' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('address')}>Address</li>
          <li className={`${activeView === 'guardian' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('guardian')}>Guardian</li>
          <li className={`${activeView === 'fee' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('fee')}>Fee</li>
          <li className={`${activeView === 'class_work' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('class_work')}>Class Work</li>
          <li className={`${activeView === 'activity' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('activity')}>Activity</li>
          <li className={`${activeView === 'achievement' ? 'bg-blue-800/30 px-2 rounded-2xl shadow-inner' : ''}`} onClick={() => setActiveView('achievement')}>Achievement</li>
        </ul>
      </div>
      {activeView === 'profile' && <Profile data={data.data.student} />}
      {activeView === 'address' && <Address data={data.data.student.addresses} />}
      {activeView === 'guardian' && <Guardian data={data.data.student.guardians} />}
      {activeView === 'fee' && <Fee data={data.data} />}
      {activeView === 'class_work' && <ClassWork data={data.data} />}
      {activeView === 'activity' && <Activity data={data.data} />}
      {activeView === 'achievement' && <Achievement data={data.data} />}


    </>
  )
}

export default ProfileHeader
export const SessionsDropdown = ({ session_id, student_id }) => {
  const navigate = useNavigate()
  const fetchedData = useStudentSessions({ student_id })
  const [isOpen, setOpen] = useState(false)
  if (fetchedData.isPending) {
    return <div>Loading</div>
  }

  const handleClick = (session_id) => {
    navigate(`/students/info/${btoa(session_id)}`)
    setTimeout(() => {
      setOpen(!isOpen)
    }, 500);

  }
  return (
    <>
      <span className='flex flex-row relative'>
        Selected Session: {'' + fetchedData.data.data.find(x => x.academic_session_id === session_id).academic_session.session}
        <span className='ml-4 text-4xl cursor-pointer rounded-full
                 border-2 border-yellow-600 bg-yellow-600/50 text-slate-800
                 hover:bg-yellow-600/30 hover:text-red-800
                  ' onClick={() => setOpen(!isOpen)}>
          <CgArrowsExchangeAltV />
        </span>
        <span className={`${!isOpen ?
          'hidden' :
          'absolute right-0 top-6 shadow-md bg-yellow-400 flex flex-col border-2 border-blue-500/50  rounded-lg'}`}>
          {fetchedData.data.data && fetchedData.data.data.map((session, index) => (
            <div key={index}
              onClick={() => handleClick(session.id)}
              className={`flex flex-row items-center justify-between gap-6 px-2 cursor-pointer ${index > 0 ? 'border-t-2 border-red-800/30' : ''}`}>
              {session.academic_session.session}
              {session.academic_session.id === session_id ?
                <span className='ml-4 w-6 h-6 flex items-center justify-center  text-sm cursor-pointer rounded-full
                 border-2 border-green-600 bg-green-500 text-green-800
                 hover:bg-green-600/30 hover:text-red-800 transition-all duration-500
                  ' onClick={() => setOpen(!isOpen)}>
                  <TiTick />
                </span>
                : ''
              }
            </div>
          ))}

        </span>
      </span>
    </>
  )
}
export const Profile = ({ data }) => {

  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div className='text-lg underline flex'>
          <span className='font-bold'>Full Profile </span>
          <span className='flex justify-between items-center rounded-full  ml-2 cursor-pointer'>
            <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
          </span>
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Id:</div>  {data.id}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Name:</div>  {data.name}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Username:</div>  {data.username}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Code:</div>  {data.code}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Dob: </div>{DateTime.fromISO(data.dob).toLocaleString(DateTime.DATE_MED)}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Gender: </div>{data.gender}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Birth Mark:</div> {data.birth_mark}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Aadhaar Number:</div> {data.aadhaar_no}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Nationality: </div>{data.nationality}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Language: </div>{data.language}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Religion: </div>{data.religion}
        </div>
        <div className=' pl-1 mb-2 flex'>
          <div className='w-36'>Caste: </div>{data.caste}
        </div>
      </div>

    </>
  )
}
export const Address = ({ data }) => {
  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div className=' pl-1 mb-2'>
          {
            data.map((address, index) => (
              <div key={index}>{address.address_type}: {address.display}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export const Guardian = ({ data }) => {
  return (
    <>
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        <div>Guardian</div>
        <div className=' pl-1 mb-2'>
          {
            data.map((guardian, index) => (
              <div key={index}>{guardian.guardian_type}: {guardian.name}</div>
            ))
          }
        </div>
      </div>
    </>
  )
}
export const Fee = ({ data }) => {
  const student_id = data.student.id
  const session_id = data.id
  const fetchedData = useStudentSessions({ student_id })
  const StudentSessionFeesData = useStudentSessionFees({ student_session_id: session_id })
  const { isOpen, setOpen } = useFormModal()
  if (fetchedData.isPending) {
    return <div>Loading</div>
  }

  if (StudentSessionFeesData.isPending) {
    return <div>Loading</div>
  }
  if (StudentSessionFeesData.isError) {
    return <div>StudentSessionFeesData Error</div>
  }
  // if(StudentSessionFeesData.isFetched){
  //   console.log(StudentSessionFeesData.data);
  // }
  return (
    <>

      {/* <StudentSessions student_id={data.data.id} /> */}
      <div className='h-42 w-full bg-gradient-to-r  from-slate-800 to-slate-700 rounded-md p-4 text-slate-300 mt-2'>
        {/* <div className='font-bold text-xl text-red-300'>Fees for Session {StudentSessionFeesData.data.data[0].academic_session.session}</div> */}
        <div className='flex flex-row justify-between items-center pr-8'>

          <div className='font-bold text-xl text-red-300'>
            Fees for Session {fetchedData.data.data.find(x => x.academic_session_id === session_id).academic_session.session}
          </div>
          <button onClick={() => setOpen(true)} title='Create new'
            className="btn btn-primary btn-sm text-xl
                            btn-rounded-symbol border-blue-300/10"><IoMdAdd /></button>
        </div>
        {
          isOpen &&
          <>
            <FormikFormModal label={'Fees'}>
              <CreateFees data={data} />
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
        <div  >
          {
            StudentSessionFeesData.data.data.length > 0 ?
              StudentSessionFeesData.data.data.map((fees, index) => (
                <div key={index} className='grid grid-cols-9 items-center py-1 text-xs border-b-2 border-violet-400/20 '>
                  <div className='flex items-center justify-center  text-center  border-r-2 border-violet-500/10'>{fees.fee_no}</div>
                  <div>  {DateTime.fromISO(fees.fee_date).toLocaleString(DateTime.DATE_MED)}</div>
                  <div className='col-span-2'>{fees.fee_template.name}</div>
                  <div>{fees.paid_amount}</div>
                  <div>{fees.payment_mode}</div>
                  <div>{fees.balance_amount > 0 ? 'Due' : 'Paid'}</div>
                  <div className='flex flex-row justify-center gap-2 col-span-2'>

                    {
                      fees && fees.fee_items.length>0 &&
                      <>
                      <FeeItems fees={fees} session_id={session_id} />
                      <PrintToPdf fees={fees} session_id={session_id} />
                      </>
                    }


                  </div>
                </div>
              ))
              :
              <div className='grid grid-cols-9 items-center py-1 border-b-2 border-violet-400/20 '>

                <div className='col-span-9 text-center'>{'-- No Data Found --'}</div>
              </div>
          }
        </div>
      </div>
    </>
  )
}

export const FeeItems = ({ fees, session_id }) => {
  const [isOpen, setOpen] = useState()
  return (
    <>
      <button onClick={() => setOpen(true)} className='btn btn-outline text-xs btn-primary btn-sm btn-rounded py-0 '>{'Details'}</button>
      {
        isOpen &&
        <>
          <FormikEditFormModal isOpen={isOpen} setOpen={setOpen} label="Edit Academic Session">
            <EditFees fees={fees} isOpen={isOpen} setOpen={setOpen} session_id={session_id} />
          </FormikEditFormModal>
        </>
      }
    </>
  )
}

const defaultFeeData = {
  fee_no: 'NEW',
  fee_date: new Date(),
  academic_class_id: null,
  academic_session_id: null,
  fee_template_id: null,
  campus_id: null,
  student_id: null,
  total_amount: 0,
  payment_mode: 'Cash',
  fee_items: [

  ]
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
export const EditFees = ({ fees, isOpen, setOpen, session_id }) => {
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

        {selectedTemplate && <SelectedPanelEditMode
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
        />}
      </div>
    </div>
  </>)

}


const SelectedPanelEditMode = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData, handleToggle, student_id, isOpen, setOpen, session_id }) => {



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
  // if (!selectedTemplate) {
  //   return (<div>Loading...</div>)
  // }
  if (!feeData) {
    return (<div>Loading...</div>)
  }
  // console.log("Finally", feeData)
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
          <FeeEntryRows feeData={feeData} setChanges={setChanges} />

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

const FeeEntryRows = ({ feeData, setChanges, }) => {

  return (
    feeData.fee_items && feeData.fee_items.map((feeTemplateItem, index) => (

      <FeeEntryRow key={index} index={index} feeTemplateItem={feeTemplateItem} setChanges={setChanges} />

    ))
  )
}

export const CreateFees = ({ data }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const [panelToggle, setPanelToggle] = useState(false)
  const [isMount, setIsMount] = useState(false);
  const [feeData, setFeeData] = useState(defaultFeeData)
  const academic_session_id = data.academic_session_id
  const academic_class_id = data.academic_class_id
  const campus_id = data.academic_class.campus_id
  const student_id = data.student.id
  // console.log(student_id)
  const payload = {
    academic_session_id, academic_class_id, campus_id
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
      <div className='flex flex-row w-[80dvw] max-w-full   h-[70dvh] max-h-full'>
        <div className={`${!panelToggle ? 'relative flex flex-col min-w-full gap-2' : 'hidden'} `}>
          {
            fetchedFeeTemplatesData.data.data.map((feeTemplate, index) => (
              <div key={index} className='btn btn-primary btn-sm text-sm'
                onClick={() => handleToggle(feeTemplate)}>
                {feeTemplate.name}
              </div>
            ))
          }
          <div className='b-0 w-full  p-2 bg-rose-600/30 flex items-center justify-center text-xl rounded-[20px] bottom-0 absolute'>
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
            setFeeData={setFeeData}
          />
        </div>
      </div>
    </>
  )
}

const SelectedPanel = ({ selectedTemplate, isMount, setIsMount, feeData, setFeeData, handleToggle, student_id }) => {
  const storeStudentFeeMutation = useStoreStudentFeeMutation()
  const [total, setTotal] = useState(0)
  const [changes, setChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = () => {

    if (saveStatus) return
    feeData.paid_amount = feeData.total_amount
    feeData.balance_amount = feeData.total_amount - feeData.paid_amount
    const payload = {
      fee_no: feeData.fee_no,
      fee_date: moment(feeData.fee_date).format('YYYY-MM-DD'),
      fee_template_id: feeData.fee_template_id,
      student_id: feeData.student_id,
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
        console.log("IsMount False");
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

              <FeeEntryRow key={index} index={index} feeTemplateItem={feeTemplateItem} setChanges={setChanges} />

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
export const FeeEntryRow = ({ feeTemplateItem, index, setChanges }) => {
  // console.log("EachRows", feeTemplateItem,index, setChanges )
  const quantityRef = useRef()
  const amountRef = useRef()
  const handleChange = (e) => {

    //console.log(e.target.value)
    setTimeout(() => {
      feeTemplateItem.amount = amountRef.current.value
      feeTemplateItem.quantity = quantityRef.current.value
      feeTemplateItem.total_amount = parseInt(quantityRef.current.value) * parseFloat(amountRef.current.value)
      setChanges(true)
    }, 700);
  }
  return (
    <>

      <div className={`${feeTemplateItem.is_active ? '' : 'bg-slate-800/20 text-slate-700'} flex flex-row  items-center gap-2 border-b-2 border-violet-400/10 pb-2`}>
        <div className='w-1/12'>{index + 1}.</div>
        <div className='w-6/12 flex flex-row items-center gap-2'>
          {feeTemplateItem.fee_head.name}
          {feeTemplateItem.keep_periodic_details ? <MonthPanel /> : ''}
        </div>
        <div className='w-1/12 text-center'>

          <input ref={quantityRef} onChange={handleChange}
            className={`${feeTemplateItem.is_customizable ? '' : ''} ${feeTemplateItem.quantity == 0 ? 'opacity-20' : ''} input w-12 text-center mb-0 border-violet-400/30 active:input-bordered input-primary py-0 px-1 h-6`}
            disabled
            type="text" name="quantity[]" defaultValue={feeTemplateItem.quantity} />
        </div>
        <div className='w-1/12 text-right'></div>
        <div className='w-1/12   flex flex-row justify-end'>
          <input ref={amountRef}
            disabled={!feeTemplateItem.is_customizable}
            className={`${feeTemplateItem.is_customizable ? '' : ''} ${feeTemplateItem.amount == 0 ? 'opacity-20' : ''} input w-28 text-right mb-0 border-violet-400/30 active:input-bordered input-primary py-0 px-1 h-6`}
            onChange={handleChange}
            type="text" name="amount[]" defaultValue={feeTemplateItem.amount} />
        </div>
        <div className='w-1/12 text-right'>:</div>
        <div className='w-1/12 text-right'>{Number(parseFloat(feeTemplateItem.total_amount)).toFixed(2)}</div>
      </div>
    </>
  )
}
export const MonthPanel = () => {
  return (
    <>
      <TbCalendarMonth />
    </>
  )
}
export const ClassWork = (data) => {
  return (
    <>
      Class Work
    </>
  )
}
export const Activity = (data) => {
  return (
    <>
      Activity
    </>
  )
}
export const Achievement = (data) => {
  return (
    <>
      Achievement
    </>
  )
}
