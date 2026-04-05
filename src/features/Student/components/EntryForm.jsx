import { useFormik } from 'formik';
import { lazy, useState } from 'react';
import * as Yup from "yup";

import {
    useCaste, useGender,
    useLanguage, useNationality, useReligion
} from '../../../hooks/queries';


import { useStoreStudentMutation, useUpdateStudentMutation } from '../hooks/mutations';


import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSelect } from '@/components/form-components/FormikSelect';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { ImageBox } from '@/components/form-components/ImageBox';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusSelect } from '../../Common/components/CampusSelect';

const Guardians=lazy(()=>import('./Guardians'))
const Addresses=lazy(()=>import('./Addresses'))
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
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                <div className='lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
                    <div className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400'>
                        Basic Information
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <div className='md:col-span-2'>
                            <FormikInputBox formik={formik} name="name" label="Name" />
                        </div>
                        <FormikInputBox formik={formik} name="dob" type={'date'} label="Date of Birth" />
                        <div>
                            {genderData.data &&
                                <FormikSelect formik={formik} name="gender" label="Gender"
                                    options={
                                        genderData.data.data && Object.entries(genderData.data.data).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                        <FormikInputBox formik={formik} name="birth_mark" type={'text'} label="Birth Mark" />
                        <FormikInputBox formik={formik} name="aadhaar_no" type={'text'} label="Aadhaar Number" />
                        <FormikInputBox formik={formik} name="email" type={'email'} label="Email" />
                        <FormikInputBox formik={formik} name="contact_no" type={'text'} label="Contact Number" />

                        <div>
                            {nationalityData.data &&
                                <FormikSelect formik={formik} name="nationality" label="Nationality"
                                    options={
                                        nationalityData.data.data && Object.entries(nationalityData.data.data).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                        <div>
                            {languageData.data &&
                                <FormikSelect formik={formik} name="language" label="Language"
                                    options={
                                        languageData.data.data && Object.entries(languageData.data.data).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                        <div>
                            {religionData.data &&
                                <FormikSelect formik={formik} name="religion" label="Religion"
                                    options={
                                        religionData.data.data && Object.entries(religionData.data.data).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                        <div>
                            {casteData.data &&
                                <FormikSelect formik={formik} name="caste" label="Caste"
                                    options={
                                        casteData.data.data && Object.entries(casteData.data.data).map(([key, value], index) => (
                                            <option key={index} value={key}>{value}</option>
                                        ))
                                    } />
                            }
                        </div>
                    </div>

                    {entryMode == 'edit' &&
                        <>
                        <div className='mt-6 border-t border-slate-200 pt-4 dark:border-slate-700'>
                                <Guardians formik={formik} name="guardians" label="Guardian" />
                        </div>
                        <div className='mt-4 border-t border-slate-200 pt-4 dark:border-slate-700'>
                            <Addresses formik={formik} name="addresses" label="Address" />
                        </div>
                        </>
                    }
                </div>

                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900'>
                    <div className='mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400'>
                        Admission
                    </div>

                    <div className='mb-4'>
                        <ImageBox formik={formik} name="profile_document_id" editable={true} resource="profile_document" />
                    </div>

                    <div className='grid grid-cols-1 gap-4'>
                        <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading} />
                        <AcademicSessionSelect formik={formik} label={'Admission Session'} />
                        <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} label={'Admission Class'} />
                        <FormikInputBox formik={formik} name="admission_no" label="Admission No" />
                        <FormikInputBox formik={formik} name="admission_date" type={"date"} label="Admission Date" />
                    </div>

                    <div className='mt-6 border-t border-slate-200 pt-4 dark:border-slate-700'>
                        <FormikSubmit formik={formik} label="Save" />
                    </div>
                </div>
            </div>


        </form>
    )
}

export default EntryForm