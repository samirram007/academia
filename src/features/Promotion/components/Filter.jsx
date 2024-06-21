
import { useFormik } from 'formik'

import * as Yup from "yup";
import { CampusSelect } from '../../Common/components/CampusSelect';
import { FormikSubmit } from '../../../components/form-components';

import { useState } from 'react';
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { AcademicClassSelect } from '../../Common/components/AcademicClassSelect';
import { SectionSelect } from '../../Common/components/SectionSelect';
import { useAcademicSessions } from '../../AcademicSession/hooks/quaries';

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



const Filter = ({ PromotionData, initialFilterValues: initialValues }) => {
    //  const {  refetch,isFetching} = useAcademicSessions(initialFilterValues)
    // const  PromotionData  = useAcademicSessions(initialFilterValues)
    const [isLoading, setIsLoading] = useState(PromotionData.isFetching)


    const mData = PromotionData.data?.data ?? [];


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,

        onSubmit: (values, { setSubmitting }) => {

            Object.assign(initialFilterValues, values);
            PromotionData.refetch()
            //    setTimeout(() => {

            setSubmitting(false)
            //    }, 500);

        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false)

        }
    })



    return (
        <div className={PromotionData.isFetching ? 'hidden' : 'flex-1 flex flex-col justify-end bg-slate-200/10  rounded-lg my-2 '}>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4   '>
                            <div className='grid gap-4 grid-cols-10   mb-2'>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}
                                <div className='col-span-10 md:col-span-2 '>
                                    <CampusSelect formik={formik} auto={false} isLoading={isLoading} setIsLoading={setIsLoading} />

                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <AcademicSessionSelect formik={formik} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <AcademicClassSelect formik={formik} campus_id={formik.values.campus_id} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <SectionSelect formik={formik} />
                                </div>
                                {formik.values &&
                                    <div className={PromotionData.isFetching ? 'hidden' : '  col-span-10 md:col-span-2 flex flex-col justify-end '}>

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

