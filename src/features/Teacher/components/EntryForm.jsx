import React, {   useState } from 'react'
import { FormikHiddenInput, FormikInputBox, FormikSelect, FormikSubmit, ImageBox } from '../../../components/form-components'
import {useFormik } from 'formik'
import * as Yup from "yup";
import { useAcademicSessions, useAddressType, useCampuses, useCaste, useGender,
    useLanguage, useNationality, useReligion } from '../../../hooks/queries'


import { useStoreTeacherMutation, useUpdateTeacherMutation } from '../hooks/mutations';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    dob: Yup.date()
        .typeError('Invalid date format'),
    admission_date: Yup.date()
        .typeError('Invalid date format'),
    campus_id: Yup.number().integer()
        .min(1, "Please select Campus")
        .required("Please select Campus")
})

const EntryForm = ({ initialValues, entryMode }) => {
    const campuses = useCampuses()
    const genderData = useGender()
    const nationalityData = useNationality()
    const religionData = useReligion()
    const casteData = useCaste()
    const languageData = useLanguage()

    const teacherStoreMutation = useStoreTeacherMutation()
    const teacherUpdateMutation = useUpdateTeacherMutation()
    const [checked, setChecked] = useState(false)

    const handleFormSubmit = (values) => {
        if(entryMode === 'create') {
          teacherStoreMutation.mutate(values)
        } else {
          teacherUpdateMutation.mutate(values)
        }
      }
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: values => {
            handleFormSubmit(values)
          }
    })
    if (campuses.isLoading) {
        return (<div>Loading...</div>)
    }
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




                    </div>
                    <div className='col-span-6 md:col-span-2'>
                        <div className='col-span-6 md:col-span-4'>
                            <ImageBox formik={formik} name="profile_document_id" editable={true} resource="profile_document" />
                        </div>
                        <div className='col-span-6 md:col-span-4'>
                            {campuses.data &&
                                <FormikSelect formik={formik} name="campus_id" label="Campus"
                                    options={
                                        campuses.data.data &&
                                        campuses.data.data.map(({ id: key, name: value }, index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                        <div className='col-span-6 md:col-span-4 mt-2'>
                            <FormikInputBox formik={formik} name="admission_no" label="Admission No" />
                        </div>
                        <div className='col-span-6 md:col-span-4'>
                            <FormikInputBox formik={formik} name="admission_date" type={"date"} label="Admission Date" />
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