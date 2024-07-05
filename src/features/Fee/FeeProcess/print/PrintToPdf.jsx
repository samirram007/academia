import { DateTime } from 'luxon'
import React, { useEffect, useRef, useState } from 'react'



import moment from 'moment';
import { Flip, toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';


import PdfModal from '../../../../components/form-components/PdfModal';
import { useFeeTemplates } from '../../../FeeTemplate/hooks/quaries';
import { MonthPanel } from '../FeeProcess';
import { Capitalize } from '../../../../libs/utils';


const apiDomain = import.meta.env.VITE_API_BASE_URL
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
const PrintToPdf = ({ fees, session_id }) => {
  const [isOpen, setOpen] = useState(false)


  return (
    <>
      {

        <button onClick={() => setOpen(true)}
          className={`${isOpen ? 'btn-error' : 'btn-outline'} badge badge-error      py-0 text-xs     `}>{'Print'}</button>
      }
      {
        isOpen &&
        <PrintModal fees={fees} isOpen={isOpen} setOpen={setOpen} session_id={session_id} />
      }
    </>
  )
}
export const PrintModal = ({ fees, isOpen, setOpen, selectedStudentSession = fees.student_session, session_id }) => {

  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const academic_session_id = fees.academic_session_id
  const academic_class_id = fees.academic_class_id
  const campus_id = fees.campus_id
  const student_id = fees.student.id

  const [payload, setPayload] = useState({
    academic_class_id, campus_id
  })
  return (

    <PdfModal isOpen={isOpen} setOpen={setOpen} label="Preview Fees">
      <PrintFees fees={fees} isOpen={isOpen} setOpen={setOpen} session_id={session_id}
        payload={payload}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        selectedStudentSession={selectedStudentSession} />
    </PdfModal>

  )
}
export const PrintFees = ({ fees, isOpen, setOpen, session_id, payload,
  selectedTemplate, setSelectedTemplate, selectedStudentSession = fees.student_session }) => {


  const fetchedFeeTemplatesData = useFeeTemplates(payload)
  const mData = fetchedFeeTemplatesData.data?.data ?? [];
  const FeeTemplatesData = mData;//useMemo(() => [...mData], [mData]);


  if (fetchedFeeTemplatesData.isPending) {
    return <div>Loading...</div>
  }


  return (<>
    {fetchedFeeTemplatesData.data &&
      <PrintFeesReadyMode
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

export const PrintFeesReadyMode = ({ FeeTemplatesData, fees, isOpen, setOpen, session_id, selectedStudentSession }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [panelToggle, setPanelToggle] = useState(false)
  const [isMount, setIsMount] = useState(false);
  const [feeData, setFeeData] = useState(defaultFeeData)
  const academic_session_id = fees.academic_session_id
  const academic_class_id = fees.academic_class_id
  const campus_id = fees.academic_class.campus_id
  const student_id = fees.student.id
  useEffect(() => {
    setFeeData(prev => ({
      ...prev, ...fees,
      campus_id: campus_id
    }))
    const tempTemplate = FeeTemplatesData.find(x => x.id === fees.fee_template_id)

    const updatedTemplate = {
      ...tempTemplate,
      fee_template_items: tempTemplate.fee_template_items.map(item => ({
        ...item,
        amount: "0.00"
      }))
    };
    setSelectedTemplate(prev => updatedTemplate)

  }, []);
  return (
    <>
      <div className=' flex flex-row bg-slate-800/20 rounded-md shadow-inner w-[95dvw] max-w-full    h-[70dvh] max-h-full  overflow-hidden'>
        <div className={`relative flex flex-col min-w-full `}>
          {
            selectedTemplate &&
            <SelectedPanelPrintMode
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
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

export const SelectedPanelPrintMode = ({ selectedTemplate, isMount, setIsMount, feeData,
  setFeeData, student_id, isOpen, setOpen, session_id, selectedStudentSession }) => {

  const componentRef = useRef()
  const [total, setTotal] = useState(0)
  const [changes, setChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
        fee_items: [...mergedItems]
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
    const mergedItems = feeData.fee_template_items.map((fee_template_item) => {
      const matchingFeeItem = feeData.fee_items.find((fee_item) => fee_template_item.fee_head_id === fee_item.fee_head_id);
      if (matchingFeeItem) {
        return { ...fee_template_item, ...matchingFeeItem };
      } else {
        return { ...fee_template_item, total_amount: fee_template_item.amount, quantity: fee_template_item.is_active };
      }
    });
    setFeeData(prev => ({
      ...prev,
      fee_items: [...mergedItems],
      total_amount: thisTotal
    }))
    setTotal(prev => thisTotal)
    setChanges(prev => false)
    return
  }, [changes])

  if (!feeData.fee_items) {
    return (<div className='bg-red-500'>Loading...</div>)
  }

  return (
    <>

      <div className=' hidden  flex-row justify-between mt-2 pb-2 border-b-4 border-violet-400/60  '>
        <div className='flex flex-row items-center justify-center '>
          <div className='font-bold'> {selectedTemplate && selectedTemplate.name}</div>

        </div>


      </div>
      <div className='relative'>

        <div className='mb-3 mr-10  bottom-0     right-0 flex justify-end'>
          <button className='badge badge-error btn-outline bg-error text-slate-50    '
            onClick={handlePrint}>Print</button>
        </div>

      </div>

      <div ref={componentRef} className='print relative overflow-y-auto   text-slate-950
       bg-white mx-auto rounded-md shadow-lg w-[750px]      max-h-[calc(100% - 180px)
        p-4 '>
        <div className='relative border-2 border-slate-900 mt-2 min-h-[400px]  '>
          <div className=' grid grid-cols-10 px-2 py-1'>
            <div className={' col-span-2 '}>No. {feeData.fee_no}</div>
            <div className={' col-span-6 '}></div>
            <div className={' col-span-2 text-right '}>
              Date: {DateTime.fromISO(feeData.fee_date).toLocaleString(DateTime.DATE_MED)}
            </div>
          </div>
          <div className='schoolHead grid grid-cols-10 p-2'>
            {/* {JSON.stringify(feeData.campus.school.logo_image)} */}
            <div className={' col-span-1 '}>
              {feeData.campus.school.logo_image ?
                <img src={feeData.campus.school.logo_image.path.includes(apiDomain)
                  ? feeData.campus.school.logo_image.path
                  : (apiDomain + feeData.campus.school.logo_image.path)} alt="" />
                :
                <img src={`${apiDomain}/storage/documents/logo.png`} style={{ width: '80px', height: '80px' }} alt="" />
              }
            </div>
            <div className='col-span-8 text-center'>
              <div className='!text-2xl uppercase font-bold '>{feeData.campus.school.name ?? 'NAVA JYOTI VIDYAPITH'}</div>
              <div>{feeData.campus.school.address ?
                feeData.campus.school.address.display :
                '20/1 west, Captepara Road, Authpur, North 24 Parganas, 743128'}</div>
              <div className='font-bold underline'>Money Receipt</div>
              <div className='flex flex-col pl-4 '>
                <div className='text-left'>Name: {feeData.student.name}</div>
                <div className='flex flex-row gap-6'>
                  <div>Class: {feeData.student_session.academic_class.name} </div>
                  <div>Sec: {feeData.student_session.section.name}</div>
                  <div>RollNo: {feeData.student_session.roll_no}</div>
                </div>

              </div>

            </div>
            <div className='col-span-1'></div>

          </div>

          <div className='px-2  '>
            <div className='grid grid-cols-12 items-center gap-2 border-y-2 border-slate-800 font-bold   text-slate-800'>

              <div className='col-span-10 border-r-2 border-slate-800'> <div className='py-1 pl-4'>Particulars</div></div>
              <div className='col-span-2 text-right '> <div className='py-1 pr-4'>Amount</div></div>
            </div>
            <FeeEntryRowsPrint feeData={feeData} setChanges={setChanges} selectedStudentSession={selectedStudentSession} />

          </div>
          <div className='px-2'>
            <div className=' w-full           text-slate-800 bottom-0 grid grid-cols-12 justify-end gap-2           font-bold border-t-4 border-slate-800  '>
              <div className='col-span-10 text-right border-r-2 border-slate-800  '>{'Total'}:</div>
              <div className='col-span-2 text-right '>
                <div className='py-1 pr-4 font-semibold'>
                  {Number(total).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <div className='w-full py-1 pl-4 text-[10px] -mt-2'>
            (in words) : Rupees. {convertNumberToWords(Number(Number(total).toFixed(2)))}
          </div>
          <div className='absolute bottom-0 right-0 pr-2 !text-[8px]'>Print Time: {moment(new Date()).format('DD-MMM-YYYY hh:mm a')}</div>
        </div>

      </div>


    </>
  )

}


export const FeeEntryRowsPrint = ({ feeData, setChanges, selectedStudentSession }) => {

  return (
    feeData.fee_items && feeData.fee_items.map((feeTemplateItem, index) => (

      <FeeEntryRowPrint key={index} index={index} feeTemplateItem={feeTemplateItem}
        selectedStudentSession={selectedStudentSession} setChanges={setChanges} />

    ))
  )
}


export const FeeEntryRowPrint = ({ feeTemplateItem, index, setChanges, selectedStudentSession }) => {

  const quantityRef = useRef()
  const amountRef = useRef()

  return (
    <>

      <div className={` grid grid-cols-12  items-center  text-xs    `}>

        <div className='col-span-10 flex flex-row items-center gap-2 pl-4 border-r-2 border-slate-800'>
          <div className='py-2'>
            <div className='flex flex-row flex-nowrap items-center  '>
              {Capitalize(feeTemplateItem.fee_head.name)}

              {feeTemplateItem.keep_periodic_details ?

                feeTemplateItem.fee_item_months &&
                feeTemplateItem.fee_item_months.length > 0 &&

                <div className={`flex flex-row ${feeTemplateItem.fee_item_months.length > 6 ? 'gap-1 ml-1' : 'gap-2 ml-2'}`}>
                  {feeTemplateItem.fee_item_months.map((x, index) => (
                    (<div key={index} className={`
                     border-slate-400  text-slate-800
                   ${feeTemplateItem.fee_item_months.length > 6 ? 'text-xs px-1 border-b-2' : 'text-xs border-2 px-2 rounded-md'}
                    font-bold mb-[1px]  `}>
                      {x.month?.short_name}
                    </div>)
                  ))}
                </div>



                : ''}

            </div>

          </div>

        </div>

        <div className='col-span-2 text-right '>
          <div className='py-1 pr-4 flex flex-row items-center justify-end'>
            {feeTemplateItem.amount > 0 ? Number(parseFloat(feeTemplateItem.total_amount)).toFixed(2) : ''}
          </div>
        </div>
      </div>
    </>
  )
}


const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

const zero = "Zero";
const arab = "Arab";
const crore = "Crore";
const lakh = "Lakh";
const thousand = "Thousand";
const hundred = "Hundred";
const currency = "Rupees";
const paisa = "Paisa";
const only = "Only";

function convertNumberToWords(amount) {
  if (amount === 0) return `${zero} ${currency} ${only}`;

  function convert(num) {
    let parts = [];
    if (num >= 1e9) {
      parts.push(`${convert(Math.floor(num / 1e9))} ${arab}`);
      num %= 1e9;
    }
    if (num >= 1e7) {
      parts.push(`${convert(Math.floor(num / 1e7))} ${crore}`);
      num %= 1e7;
    }
    if (num >= 1e5) {
      parts.push(`${convert(Math.floor(num / 1e5))} ${lakh}`);
      num %= 1e5;
    }
    if (num >= 1000) {
      parts.push(`${convert(Math.floor(num / 1000))} ${thousand}`);
      num %= 1000;
    }
    if (num >= 100) {
      parts.push(`${convert(Math.floor(num / 100))} ${hundred}`);
      num %= 100;
    }
    if (num >= 20) {
      parts.push(`${tens[Math.floor(num / 10)]}`);
      if (num % 10 > 0) parts.push(units[num % 10]);
    } else if (num >= 10) {
      parts.push(`${teens[num - 10]}`);
    } else if (num > 0) {
      parts.push(`${units[num]}`);
    }
    return parts.join(" ");
  }

  let integerPart = Math.floor(amount);
  let wholeWordPart = convert(integerPart);
  let result = wholeWordPart ? `${wholeWordPart} ${currency}` : '';

  let decimalPart = Math.round((amount - integerPart) * 100);
  if (decimalPart > 0) {
    if (wholeWordPart) {
      result += " and ";
    }
    result += `${convert(decimalPart)} ${paisa}`;
  }

  return `${result} ${only}`;
}
export default PrintToPdf

