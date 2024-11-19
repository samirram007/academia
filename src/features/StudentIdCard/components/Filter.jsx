
import { useFormik } from 'formik';

import * as Yup from "yup";
import { CampusSelect } from '../../Common/components/CampusSelect';


import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import { useState } from 'react';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { SectionSelect } from '../../Common/components/SectionSelect';

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



const Filter = ({ StudentIdCardData, initialFilterValues, setFilterReady }) => {
    //  const {  refetch,isFetching} = useAcademicSessions(initialFilterValues)
    // const  StudentIdCardData  = useAcademicSessions(initialFilterValues)
    const [isLoading, setIsLoading] = useState(StudentIdCardData.isLoading)

// console.log(new Date('Y-m-d'))
    const mData = StudentIdCardData.data?.data ?? [];

//   const data = useMemo(() => {

//     return mData.map(item => ({
//       ...item,
//       isTouched: false,
//       selectedStudentSession: item.student_sessions.find(x => x.academic_session_id == initialFilterValues.academic_session_id)
//     }))
//   }, [mData]);

    const formik = useFormik({
        initialValues:initialFilterValues,
         enableReinitialize: true,

        onSubmit: (values,{setSubmitting}) => {

           Object.assign(initialFilterValues, values);
           StudentIdCardData.refetch()
        //    setTimeout(() => {

               setSubmitting(false)
               StudentIdCardData.data??setFilterReady(true)
        //    }, 500);

        },
        onError: (errors, values,{setSubmitting}) => {
            setSubmitting(false)

        }
    })



    return (
        <div className={isLoading ? 'hidden' : 'flex-1 flex flex-col justify-end bg-slate-200/10  rounded-lg my-2 '}>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4   '>
                            <div className='grid gap-4 grid-cols-10   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-10 md:col-span-2 '>
                                    <CampusSelect formik={formik} auto={true}
                                    isLoading={isLoading}
                                    setFilterReady={setFilterReady}
                                    setIsLoading={setIsLoading} />



                                </div>
                                <div className='col-span-10 md:col-span-2 '>

                                    <AcademicSessionSelect  formik={formik}
                                    setFilterReady={setFilterReady}
                                    campus_id={formik.values.campus_id} />

                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <AcademicClassSelect formik={formik} setFilterReady={setFilterReady}  campus_id={formik.values.campus_id} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <SectionSelect formik={formik} setFilterReady={setFilterReady}   />
                                </div>
                                {formik.values &&
                                    <div className={isLoading ? 'hidden' : '  col-span-10 md:col-span-2 flex flex-col justify-end '}>

                                        <FormikSubmit formik={formik} label={'Filter'} />
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

export default Filter

