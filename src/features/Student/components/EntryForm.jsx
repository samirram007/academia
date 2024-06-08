import React, { useState } from 'react'
import { FormikHiddenInput, FormikInputBox, FormikSelect, FormikSubmit, ImageBox } from '../../../components/form-components'
import { useFormik } from 'formik'
import * as Yup from "yup";
import {
    useCaste, useGender,
    useLanguage, useNationality, useReligion
} from '../../../hooks/queries'


import { useStoreStudentMutation, useUpdateStudentMutation } from '../hooks/mutations';
import Guardians from './Guardians';
import Addresses from './Addresses';
import { useCampuses } from '../../Campus/hooks/queries';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';
import { CampusSelect } from '../../Common/components/CampusSelect';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    dob: Yup.date()
        .typeError('Invalid date format'),
    admission_date: Yup.date()
        .typeError('Invalid date format'),
})

const EntryForm = ({ initialValues, entryMode }) => {
    // const campuses = useCampuses()
    // const academic_sessions = useAcademicSessions()
    const genderData = useGender()
    const nationalityData = useNationality()
    const religionData = useReligion()
    const casteData = useCaste()
    const languageData = useLanguage()

    const studentStoreMutation = useStoreStudentMutation()
    const studentUpdateMutation = useUpdateStudentMutation()
    const [checked, setChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const handleFormSubmit = (values) => {
        if (entryMode === 'create') {
            studentStoreMutation.mutate(values)
        } else {
            studentUpdateMutation.mutate(values)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
          //  console.log(typeof values.academic_session_id);
            if(typeof values.campus_id==='string' && values.campus_id!==''){
                values.campus_id=parseInt(values.campus_id)
            }
            if(typeof values.academic_session_id==='string'  && values.academic_session_id!==''){
                values.academic_session_id=parseInt(values.academic_session_id)
            }
            if(typeof values.academic_class_id==='string'  && values.academic_class_id!==''){
                values.academic_class_id=parseInt(values.academic_class_id)
            }

          //  return
            handleFormSubmit(values)
        }
    })
    // if (campuses.isLoading) {
    //     return (<div>Loading...</div>)
    // }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1  '>
                <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                    <div className='grid gap-4 col-span-6 md:col-span-4 border-b-2 md:border-r-2 md:border-b-0 border-blue-300/30 pb-2 px-4 mb-2 '>
                        <div className='grid gap-4 grid-cols-6  border-b-2 border-blue-300/30 pb-2  mb-2'>
                            <div className='col-span-6 md:col-span-6'>

                                <FormikInputBox formik={formik} name="name" label="Name" />

                            </div>
                            <div className='col-span-6 md:col-span-3'>
                                <FormikInputBox formik={formik} name="dob" type={'date'} label="Date of Birth" />
                            </div>

                            <div className=' col-span-6 md:col-span-3'>

                                {genderData.data &&
                                    <FormikSelect formik={formik} name="gender" label="Gender"
                                        options={
                                            genderData.data.data && Object.entries(genderData.data.data).map(([key, value], index) => (
                                                <option key={index} value={key}>{value}</option>
                                            ))
                                        } />
                                }

                            </div>
                        </div>
                        <div className='grid gap-4 grid-cols-6 border-b-2 border-blue-300/30 pb-2  mb-2'>
                            <div className='  col-span-6 md:col-span-3 '>
                                <FormikInputBox formik={formik} name="birth_mark" type={'text'} label="Birth Mark" />

                            </div>
                            <div className='  col-span-6 md:col-span-3 '>
                                <FormikInputBox formik={formik} name="aadhaar_no" type={'text'} label="Aadhaar Number" />

                            </div>

                        </div>
                        <div className='grid gap-4 grid-cols-6 border-b-2 border-blue-300/30 pb-2  mb-2'>
                            <div className='  col-span-6 md:col-span-3 '>
                                <FormikInputBox formik={formik} name="email" type={'email'} label="Email" />


                            </div>
                            <div className='  col-span-6 md:col-span-3 '>
                                <FormikInputBox formik={formik} name="contact_no" type={'text'} label="Contact Number" />

                            </div>

                        </div>
                        <div className='grid gap-4 grid-cols-6'>
                            <div className='  col-span-6 md:col-span-3 '>
                                {nationalityData.data &&
                                    <FormikSelect formik={formik} name="nationality" label="Nationality"
                                        options={
                                            nationalityData.data.data && Object.entries(nationalityData.data.data).map(([key, value], index) => (
                                                <option key={index} value={key}>{value}</option>
                                            ))
                                        } />
                                }
                            </div>
                            <div className='  col-span-6 md:col-span-3 '>
                                {languageData.data &&
                                    <FormikSelect formik={formik} name="language" label="Language"
                                        options={
                                            languageData.data.data && Object.entries(languageData.data.data).map(([key, value], index) => (
                                                <option key={index} value={key}>{value}</option>
                                            ))
                                        } />
                                }

                            </div>
                            <div className='  col-span-6 md:col-span-3 '>
                                {religionData.data &&
                                    <FormikSelect formik={formik} name="religion" label="Religion"
                                        options={
                                            religionData.data.data && Object.entries(religionData.data.data).map(([key, value], index) => (
                                                <option key={index} value={key}    >{value}</option>
                                            ))
                                        } />
                                }
                            </div>
                            <div className=' col-span-6 md:col-span-3 '>

                                {casteData.data &&
                                    <FormikSelect formik={formik} name="caste" label="Caste"
                                        options={
                                            casteData.data.data && Object.entries(casteData.data.data).map(([key, value], index) => (
                                                <option key={index} value={key}    >{value}</option>
                                            ))
                                        } />
                                }
                            </div>
                        </div>
                        {entryMode == 'edit' &&
                            <>
                                <Guardians formik={formik} name="guardians" label="Guardian" />
                                <Addresses formik={formik} name="addresses" label="Address" />
                            </>
                        }



                    </div>
                    <div className='col-span-6 md:col-span-2  '>
                            <div className='col-span-6 md:col-span-4'>
                                <ImageBox formik={formik} name="profile_document_id" editable={true} resource="profile_document" />
                            </div>
                        <div className='  grid grid-cols-4 gap-4'>
                            <div className='col-span-6 md:col-span-2'>
                                <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading} />

                            </div>
                            <div className='col-span-6 md:col-span-2'>

                                <AcademicSessionSelect formik={formik} campus_id={formik.values.campus_id} label={'Admission Session'} />

                            </div>
                            <div className='col-span-6 md:col-span-2'>

                                <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} label={'Admission Class'} />

                            </div>
                            <div className='col-span-6 md:col-span-2 '>
                                <FormikInputBox formik={formik} name="admission_no" label="Admission No" />
                            </div>
                            <div className='col-span-6 md:col-span-2'>
                                <FormikInputBox formik={formik} name="admission_date" type={"date"} label="Admission Date" />
                            </div>
                        </div>

                        <div className='mx-auto flex justify-center items-center border-t-2 border-blue-300/10 mt-2 pt-6'>
                            <FormikSubmit formik={formik} label="Save" />

                        </div>

                    </div>


                </div>

                <div className='order-first'>

                    <div className="form-control ">
                        {/* <FormikCheckBox formik={formik} name="is_current" type={"checkbox"} label="Is Current?" /> */}

                    </div>


                </div>
            </div>


        </form>
    )
}

export default EntryForm