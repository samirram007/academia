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
            <div className='flex flex-col gap-2'>
                <div className='flex w-max items-center rounded-full border border-amber-300/60 bg-amber-100 px-3 py-1.5 text-sm font-medium text-amber-900 shadow-sm dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100'>

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
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    {
                        selectedStudentSession ?
                            <>

                                <div className='rounded-full border border-emerald-300/50 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-200'>
                                    Class: {'' + selectedStudentSession.academic_class.name} | Section: {'' + selectedStudentSession.section.name} | Roll No: {'' + selectedStudentSession.roll_no}
                                </div>
                                <div onClick={() => { setOpen(true) }} className='ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-100 text-blue-700 transition hover:bg-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:hover:bg-blue-500/25'>
                                    <MdOutlineModeEditOutline className='text-base' />
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
            <span className='relative z-10 flex items-center gap-2'>
                Selected Session: {'' + selectedSession.session}

                <span className='ml-2 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-amber-500/40 bg-amber-300/40 text-lg text-amber-900 transition hover:bg-amber-300/60 dark:border-amber-300/30 dark:bg-amber-500/20 dark:text-amber-200' onClick={() => setOpen(!isOpen)}>
                    <CgArrowsExchangeAltV />
                </span>
                <span className={`${!isOpen ?
                    'hidden' :
                    'absolute right-0 top-8 z-20 flex min-w-[12rem] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900'}`}>
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
                className={`flex items-center justify-between gap-6 px-3 py-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${index > 0 ? 'border-t border-slate-200 dark:border-slate-700' : ''}`}>
                {session.session}
                {session.id === session_id ?
                    <span className='ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' onClick={() => setOpen(!isOpen)}>
                        <TiTick />
                    </span>
                    : '---------'
                }
            </div>
        </>
    )
}



