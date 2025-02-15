
import { useFormik } from 'formik';

import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import * as Yup from "yup";

import { useState } from 'react';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { SectionSelect } from '../../Common/components/SectionSelect';
import { useStorePromotionMutation } from '../hooks/mutations';

import moment from 'moment';
import { Flip, toast } from "react-toastify";
import { CampusAcademicClassSelect } from '../../Common/components/CampusAcademicClassSelect';
const validationSchema = Yup.object().shape({
    // campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})

const initialValues = {
    name: '',
    code: '',
    campus_id: 1,
    academic_session_id: moment(new Date()).format('YYYY'),
    academic_class_id: 1,
    is_available: true,
    capacity: 0,
    promotion_type: 'class_promotion'

}


const Promote = ({ table, initialFilterValues }) => {
    const promotionMutate = useStorePromotionMutation()
    // const { data:PreviousClassData,refetch,isFetching} = useAcademicSessions({campus_id:initialValues.campus_id})
    // const  PreviousClassData  = useAcademicSessions(initialFilterValues)

    const [showSelectedStudent, setShowSelectedStudent] = useState(false)

    const formik = useFormik({
        initialValues: { ...initialFilterValues },
        enableReinitialize: true,

        onSubmit: (values, { setSubmitting }) => {

            //Check if any student is selected
            if (table.getSelectedRowModel().flatRows.length == 0) {

                setSubmitting(false)
                return
            }


            //Map selected students
            const selectedStudentData = table.getSelectedRowModel().flatRows
                .map(x => ({
                    student_id: x.original.id,
                    // previous_student_session_id: x.original.selectedStudentSession.id,
                    previous_student_session_id: x.original.student_sessions[0].id,
                    new_student_session_id: null,
                    campus_id: values.campus_id,
                    academic_session_id: values.academic_session_id,
                    academic_class_id: values.academic_class_id,
                }))
            // console.log('values', values, selectedStudentData);

            const newData = { ...values }
            const oldData = { ...initialFilterValues }
            if (newData.academic_session_id == oldData.academic_session_id) {
                toast.info("Select New Academic Session", { transition: Flip })
                setSubmitting(false)
                return
            }
            if (newData.academic_class_id == oldData.academic_class_id) {
                toast.info("Select New Academic Class", { transition: Flip })
                setSubmitting(false)
                return
            }
            const payloadValues = { newData, oldData, students: selectedStudentData }

            //console.log(payloadValues, 'one or few Student Selected');
            //   return
            promotionMutate.mutate(payloadValues), {
                onSuccess: () => {
                    toast.success("Promotion Success", { transition: Flip })
                    setShowSelectedStudent(false)
                    table.resetRowSelection()
                    setSubmitting(false)
                },
                onError: () => {
                    toast.error("Promotion Failed", { transition: Flip })
                    setShowSelectedStudent(false)
                    table.resetRowSelection()
                    setSubmitting(false)
                },


            }

        },

    })



    return (
        <div className={'flex-1 flex flex-col justify-end bg-blue-600/20  rounded-lg my-2 p-2 '}>

            <div>
                <div className=' border-b-2 border-b-red-600 relative flex flex-row items-start justify-start pb-1'>
                    <div className='text-md '>Promotion Setup</div>
                    {
                        table.getSelectedRowModel().flatRows.length
                            ? (
                                <div onClick={() => setShowSelectedStudent(prev => !prev)}
                                    className=' cursor-pointer badge badge-error badge-sm absolute top-0 right-0 text-[10px]'>
                                    {table.getSelectedRowModel().flatRows.length}
                                    <span className='pl-1'> Student{table.getSelectedRowModel().flatRows.length > 1 && 's'} Selected</span>
                                </div>
                            )
                            : ('')
                    }
                </div>
                <ul className={`flex flex-row gap-2 p-2 ${!showSelectedStudent && 'hidden'}`}>
                    {table.getSelectedRowModel().flatRows.map((element, index) => {
                        // element.original.selectedStudentSession.is_promoted=true
                        // console.log(element.original)
                        return <li key={index} className='badge badge-success  '>
                            <span className='badge badge-error -ml-3 mr-1'>{element.original.id}</span>
                            {element.original.name}
                        </li>
                    })}
                </ul>

            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4   '>
                            <div className='grid gap-4 grid-cols-10   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}

                                <div className='col-span-10 md:col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <CampusAcademicClassSelect formik={formik} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <SectionSelect formik={formik} />
                                </div>
                                {formik.values &&
                                    <div className={'   flex flex-col justify-end '}>

                                        <FormikSubmit formik={formik} btnColor={`btn-error`} label={'Promote'} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Promote

