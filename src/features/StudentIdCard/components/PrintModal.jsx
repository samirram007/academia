import React, { useEffect, useRef, useState } from 'react'
import { RiPrinterLine } from 'react-icons/ri'
import PdfModal from './PdfModal'
import { useReactToPrint } from 'react-to-print'
import { DateTime } from 'luxon'


const PrintModal = ({ printQueue }) => {
    const [isOpen, setOpen] = useState(false)


    return (
        <>
            <div className='relative btn ' onClick={() => setOpen(true)}>
                {printQueue &&
                    <>

                        <span className='absolute text-red-500 bg-slate-100 w-4 h-4 text-[9px] rounded-full top-0 right-0 -mr-2 -mt-1
                                        flex flex-row justify-center items-center pt-[2px] border-l-2 border-b-2 border-red-400/80'>
                            {printQueue?.length}</span>

                    </>}
                <RiPrinterLine className='text-lg' />

            </div>
            {

                isOpen &&
                <PrintModalView isOpen={isOpen} setOpen={setOpen} printQueue={printQueue} />
            }
        </>
    )
}
export const PrintModalView = ({ isOpen, setOpen, printQueue }) => {

    return (
        <PdfModal isOpen={isOpen} setOpen={setOpen} label="Preview IdCard">
            <div className='flex flex-row bg-slate-800/60 rounded-md shadow-inner w-[80dvw] max-w-full   h-[70dvh] max-h-full pb-[2px]'>
                <div className={`relative flex flex-col min-w-full gap-0`}>

                    {
                        printQueue &&
                        <SelectedPanelPrintMode printQueue={printQueue} />
                    }
                </div>
            </div>
        </PdfModal>
    )

}

export const SelectedPanelPrintMode = ({ printQueue }) => {

    const componentRef = useRef()
    const [total, setTotal] = useState(0)
    const [changes, setChanges] = useState(false);
    const [saveStatus, setSaveStatus] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    console.log(printQueue)



    return (
        <>

            <div className=' hidden  flex-row justify-between mt-2 pb-2 border-b-4 border-violet-400/60  '>
                <div className='flex flex-row items-center justify-center '>
                    {/* <div className='font-bold'> {selectedTemplate && selectedTemplate.name}</div> */}

                </div>


            </div>
            <div className='relative'>

                <div className='mb-3 mr-10 absolute bottom-0   right-0'>
                    <button className='btn btn-outline btn-error btn-sm btn-rounded' onClick={handlePrint}>Print</button>
                </div>
            </div>

            <div ref={componentRef} className='relative overflow-y-auto text-slate-950
         bg-white mx-auto rounded-md shadow-lg w-[750px]
         h-svh max-h-[calc(100% - 200px)] px-4 my-0'>


                <div className={`relative flex-1 p-3
                items-center flex gap-1 flex-row flex-wrap justify-between my-0`}>

                    {
                        printQueue && printQueue.map((data, index) => (
                            <div key={index} className={`w-[220px] h-[300px] bg-slate-300
                            flex  flex-col items-center flex-wrap gap-2  py-2 text-lg border-b
                             border-slate-800/50 rounded-xl text-slate-900 `}   >
                                <div className='relative'>
                                    <div className=' w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full overflow-hidden shadow-lg'>

                                        {
                                            data.profile_document ?
                                                <img src={data.profile_document.path} className='w-full h-full' /> :
                                                <img src={`${baseUrl}/storage/documents/student.png`} className='w-full h-full' alt="" />

                                        }
                                    </div>
                                </div>
                                <div>
                                    <div>Name: {data.name}</div>
                                    <div>Dob: {DateTime.fromISO(data.dob).toLocaleString(DateTime.DATE_MED)}</div>
                                    <div>Session: {data.selectedStudentSession.academic_session.session}</div>
                                    <div>Campus: {data.selectedStudentSession.campus.name}</div>

                                    <div>Class: {data.selectedStudentSession.academic_class.name}</div>
                                    <div>Section: {data.selectedStudentSession.section.name}</div>
                                    <div>Roll No.: {data.selectedStudentSession.roll_no}</div>
                                </div>

                            </div>

                        ))
                    }



                </div>

            </div>


        </>
    )

}
export default PrintModal


