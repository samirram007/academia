import FormikEnrollmentFormModal from '@/components/form-components/FormikEnrollmentFormModal'
import { useEffect, useState } from 'react'
import { CgArrowsExchangeAltV } from 'react-icons/cg'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import Admission from './Admission'
import Enrollment from './Enrollment'
import Promotion from './Promotion'
const combine = (a, b, prop) =>
    Object.values(
        [...a, ...b].reduce((acc, v) => {
            if (v[prop])
                acc[v[prop]] = acc[v[prop]]
                    ? { ...acc[v[prop]], ...v }
                    : { ...v };
            return acc;
        }, {})
    );
const StudentSession = (
    {
        data,
        fetchedAcademicSessions,
        academicSessions, setAcademicSessions,
        studentSessions, setStudentSessions,
        selectedSession, setSelectedSession,
        selectedStudentSession

    }
) => {

    const [isOpen, setOpen] = useState(false)
    const [allowedSessions, setAllowedSessions] = useState([])
    // const [selectedStudentSession, setSelectedStudentSession] = useState(null)


    useEffect(() => {
        const allowed = studentSessions.reduce((acc, item) => {
            acc.add(item.academic_session.id);
            if (item.academic_session.previous_academic_session_id) {
                acc.add(item.academic_session.previous_academic_session_id);
            }
            if (item.academic_session.next_academic_session_id) {
                acc.add(item.academic_session.next_academic_session_id);
            }
            return acc;
        }, new Set());

        const allowedArray = Array.from(allowed);
        setAllowedSessions(allowedArray)
        const filteredAcademicSessions = fetchedAcademicSessions.filter(x => allowedArray.includes(x.id))

        const array1 = [...filteredAcademicSessions];
        const array2 = [...studentSessions.map(x => x.academic_session)];

        setAcademicSessions(prev => combine(array1, array2, 'id'))
        // console.log("aca", academicSessions);
    }, []);


    return (
        <>
            <div className='flex flex-col'>
                <div className='flex flex-row items-center w-max mb-2 bg-yellow-400 px-2 rounded-2xl shadow-md border-2 border-white/20'>

                    {
                        selectedSession ?
                            <SessionsDropdown session_id={selectedSession.id}
                                data={data}
                                student_id={data.id}
                                selectedStudentSession={selectedStudentSession}
                                academicSessions={academicSessions}
                                selectedSession={selectedSession}
                                setSelectedSession={setSelectedSession}
                            />
                            :
                            <div>
                                {data.admission.academic_session ?
                                    data.admission.academic_session.session :
                                    'No admission Info Found'
                                }
                            </div>



                    }
                    <div>
                    </div>
                </div>
                <div className='flex flex-row'>
                    {
                        selectedStudentSession ?
                            <>

                                <div className='bg-green-500 font-semibold text-sm px-2 rounded-2xl shadow-md border-2
                 border-white/20 text-green-900'>
                                    Class: {'' + selectedStudentSession.academic_class.name} | Section: {'' + selectedStudentSession.section.name} | Roll No: {'' + selectedStudentSession.roll_no}
                                </div>
                                <div onClick={() => { setOpen(true) }} className='cursor-pointer flex  justify-between items-center rounded-full  ml-2'>
                                    <MdOutlineModeEditOutline className='text-orange-600 text-xl  ' />
                                </div>
                                {
                                    isOpen &&
                                    <>
                                        <FormikEnrollmentFormModal label={'Edit Enrollment'}
                                            isOpen={isOpen} setOpen={setOpen}>

                                            <Enrollment data={data} entryMode={'edit'}
                                            selectedStudentSession={selectedStudentSession}
                                                enrollmentType={selectedStudentSession.status} />
                                        </FormikEnrollmentFormModal>
                                    </>
                                }
                            </>
                            :

                            <>
                                {
                                    studentSessions && studentSessions.length!==0
                                        ? <Promotion data={data} academicSessions={academicSessions} selectedSession={selectedSession} />
                                        : <Admission data={data} academicSessions={academicSessions} selectedStudentSession={selectedStudentSession} />
                                }
                            </>

                    }



                </div>
            </div>
        </>
    )
}

export default StudentSession

export const SessionsDropdown = ({ data, session_id, student_id, selectedStudentSession, academicSessions, selectedSession,
    setSelectedSession }) => {
    const [isOpen, setOpen] = useState(false)

    // console.log("ac",selectedSession,academicSessions, academicSessions.data.find(x => x.id === selectedSession.id).session);
    return (
        <>
            <span className='flex flex-row relative'>
                Selected Session: {'' + selectedSession.session}

                <span className='ml-4 text-4xl cursor-pointer rounded-full
                 border-2 border-yellow-600 bg-yellow-600/50 text-slate-800
                 hover:bg-yellow-600/30 hover:text-red-800
                  ' onClick={() => setOpen(!isOpen)}>
                    <CgArrowsExchangeAltV />
                </span>
                <span className={`${!isOpen ?
                    'hidden' :
                    'absolute right-0 top-6 shadow-md bg-yellow-400 flex flex-col border-2 border-blue-500/50  rounded-lg'}`}>
                    {
                        academicSessions.map((session, index) => (

                            <SessionsDropdownContent key={index}
                                index={index}
                                session={session}
                                selectedSession={selectedSession}
                                setSelectedSession={setSelectedSession}
                                academicSessions={academicSessions}
                                isOpen={isOpen}
                                setOpen={setOpen}
                                session_id={session_id}
                            />


                        ))
                    }

                </span>
            </span>
        </>
    )
}
export const SessionsDropdownContent = ({ index, session, isOpen, setOpen, selectedSession, setSelectedSession, academicSessions, session_id }) => {

    const handleClick = (session_id) => {
        // navigate(`/students/info/${btoa(session_id)}`)
        //  console.log(academicSessions.find(x=>x.id==session_id));
        setSelectedSession(prev => (academicSessions.find(x => x.id == session_id)))

        setTimeout(() => {
            setOpen(prev => !prev)
        }, 500);

    }

    return (
        <>
            <div
                onClick={() => handleClick(session.id)}
                className={`flex flex-row items-center justify-between gap-6 px-2 cursor-pointer ${index > 0 ? 'border-t-2 border-red-800/30' : ''}`}>
                {session.session}
                {session.id === session_id ?
                    <span className='ml-4 w-6 h-6 flex items-center justify-center  text-sm cursor-pointer rounded-full
                 border-2 border-green-600 bg-green-500 text-green-800
                 hover:bg-green-600/30 hover:text-red-800 transition-all duration-500
                  ' onClick={() => setOpen(!isOpen)}>
                        <TiTick />
                    </span>
                    : '---------'
                }
            </div>
        </>
    )
}



