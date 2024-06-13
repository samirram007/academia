import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { CampusSelect } from '../../../Common/components/CampusSelect';
import { AcademicSessionSelect } from '../../../Common/components/AcademicSessionSelect';
import { AcademicClassSelect } from '../../../Common/components/AcademicClassSelect';
import { FormikInputBox, FormikSubmit } from '../../../../components/form-components';
import { SectionSelect } from '../../../Common/components/SectionSelect';
import { RiAiGenerate } from "react-icons/ri";
import * as Yup from "yup";
import { fetchGenerateRollNo } from '../../../StudentSession/services/apis';
import { useGenerateRollNo } from '../../../StudentSession/hooks/queries';
import { Flip, toast } from 'react-toastify';
import { useStoreEnrollmentMutation, useUpdateEnrollmentMutation } from '../../../StudentSession/hooks/mutations';



const validationSchema = Yup.object().shape({
    campus_id: Yup.number()
        .required("Campus is required")
        .min(1, "Campus must be selected"),
    academic_session_id: Yup.number()
        .required("Academic Session is required"),
    academic_class_id: Yup.number()
        .required("Academic Class is required"),
    section_id: Yup.number()
        .required("Section is required"),
    admission_no: Yup.string()
        .required("Admission No is required")
        .typeError('Admission No is required'),
    admission_date: Yup.date()
        .typeError('Invalid date format'),
})


const Enrollment = ({ data, entryMode, enrollmentType, selectedStudentSession }) => {
    const [isLoading, setIsLoading] = useState(false);
    //console.log("Selected Student  Session", selectedStudentSession);
    const enrollmentStoreMutation = useStoreEnrollmentMutation()
    const enrollmentUpdateMutation = useUpdateEnrollmentMutation()


    const initialValues = {
        student_id: data.id,
        academic_session_id: data.academic_session_id ?? 1,
        academic_class_id: data.academic_class_id ?? 1,
        campus_id: data.campus_id ?? 1,
        admission_no: data.admission_no ?? '',
        admission_date: data.admission_date ?? new Date().toISOString().slice(0, 10),
        section_id: '',
        roll_no: '',
        status: enrollmentType
    }

    const formik = useFormik({
        initialValues: (entryMode == 'edit' ? ({ ...initialValues, ...selectedStudentSession }) : initialValues),
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            //  console.log(typeof values.academic_session_id);
            if (typeof values.campus_id === 'string' && values.campus_id !== '') {
                values.campus_id = parseInt(values.campus_id)
            }
            if (typeof values.academic_session_id === 'string' && values.academic_session_id !== '') {
                values.academic_session_id = parseInt(values.academic_session_id)
            }
            if (typeof values.academic_class_id === 'string' && values.academic_class_id !== '') {
                values.academic_class_id = parseInt(values.academic_class_id)
            }
            if (typeof values.section_id === 'string' && values.section_id !== '') {
                values.section_id = parseInt(values.section_id)
            }
            // console.log(values);
            //  return
            handleFormSubmit(values)
        }
    })
    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            enrollmentStoreMutation.mutate(values)
        } else if (entryMode === 'edit') {
            enrollmentUpdateMutation.mutate(values)
        }

    }


    // console.log("Selected Student  Session", selectedStudentSession);
    // return
    return (
        <div className='flex flex-row w-[50dvw] max-w-full   h-[70dvh] max-h-full'>
            <form onSubmit={formik.handleSubmit} className='w-full '>
                {enrollmentType == 1 &&
                    <div className={`grid grid-cols-12    `}>
                        <div className='flex col-span-12 flex-row gap-4 justify-between border-b-2 border-blue-400 pb-2'>

                            <div className='col-span-6 '>
                                <FormikInputBox formik={formik} name="admission_no" label="Admission No" />
                            </div>
                            <div className='col-span-6 '>
                                <FormikInputBox formik={formik} name="admission_date" type={"date"} label="Admission Date" />
                            </div>
                        </div>


                    </div>
                }
                <div className='grid grid-cols-6 gap-4 '>

                    <div className='col-span-3'>
                        <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading} />

                    </div>
                    <div className='col-span-3'>
                        {enrollmentType == 1
                            ? <AcademicSessionSelect formik={formik}   label={'Admission Session'} />
                            : <AcademicSessionSelect formik={formik}  label={'Registration Session'} />
                        }

                    </div>
                    <div className='col-span-3'>
                        {enrollmentType == 1
                            ? <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} label={'Admission Class'} />
                            : <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} label={'Registration Class'} />
                        }
                    </div>
                    <div className='col-span-3'>

                        <SectionSelect formik={formik} campus_id={formik.values.campus_id} label={'Section'} />

                    </div>

                </div>
                <div className='flex flex-row items-center justify-center'>
                    <div className='flex flex-row items-center
                    justify-center w-4/8 gap-2 bg-slate-600/80 mt-4 rounded-xl p-4 '>
                        <FormikInputBox formik={formik} name="roll_no" label={'Roll No'} extClass={'text-nowrap'} />
                        {
                            // entryMode == 'create' &&
                            <GenerateRollNo formik={formik} entryMode={entryMode} />
                        }
                    </div>
                </div>

                <div className='order-first'>
                    <div className='mx-auto flex justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                        <FormikSubmit formik={formik} label="Save" />
                    </div>


                </div>

            </form>
        </div>
    )
}

export default Enrollment

export const GenerateRollNo = ({ formik, entryMode }) => {

    const getRollNo = async () => {
        if (formik.values.campus_id == '' || formik.values.academic_session_id == '' || formik.values.academic_class_id == '' || formik.values.section_id == '') {
           return
        }
        // formik.validationSchema=validationSchema
        const fetchedRollNo = await useGenerateRollNo(formik.values)
        formik.setFieldValue('roll_no', fetchedRollNo.roll_no)
    }
    const handleClick=()=>{
        if (formik.values.campus_id == '' || formik.values.academic_session_id == '' || formik.values.academic_class_id == '' || formik.values.section_id == '') {
            // console.log('Error');
            toast.error("Please complete necessary select", { transition: Flip })
            return
        }
        // console.log('Error');
        getRollNo()
    }
    useEffect(() => {

        if (entryMode == 'create') {
            formik.setFieldValue('roll_no', '')
            getRollNo()
        }
    }, [formik.values.section_id, formik.values.academic_class_id, formik.values.academic_session_id, formik.values.campus_id])
    return (
        <>
            <RiAiGenerate onClick={() => handleClick()} className='text-4xl text-blue-600/80 cursor-pointer hover:text-orange-600' />
        </>
    )
}
