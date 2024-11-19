
import { useFormik } from 'formik';

import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import * as Yup from "yup";

import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';
import { CampusAcademicClassSelect } from '../../Common/components/CampusAcademicClassSelect';
import { SectionSelect } from '../../Common/components/SectionSelect';
import { usePromotionContext } from '../context/usePromotionContext';

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



const PreviousClassFilter = () => {

    const {
        previousClassData,
        xData,
        isFetchingPreviousClassData,
        isReFetchingPreviousClassData,
        isErrorPreviousClassData,
        refetch,
        initialValues,
        initialFilterValues
    } = usePromotionContext();
    const formik = useFormik({
        initialValues: initialFilterValues,
        onSubmit: async (values, { setSubmitting }) => {

            // Object.assign(initialFilterValues, values);
            await refetch(values).finally(() => {
                setSubmitting(false);
            });


        }

    })



    return (
        <div className={'flex-1 flex flex-col justify-end bg-slate-200/10  rounded-lg my-2 '}>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6   pb-2 px-4   '>
                            <div className='grid gap-4 grid-cols-10   mb-2'>

                                <div className='col-span-10 md:col-span-2 '>
                                    <AcademicSessionSelect formik={formik} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <CampusAcademicClassSelect formik={formik} />
                                </div>
                                <div className='col-span-10 md:col-span-2 '>
                                    <SectionSelect formik={formik} />
                                </div>

                                {isFetchingPreviousClassData || isReFetchingPreviousClassData ?
                                    (
                                        <div className={'flex flex-col justify-end '}>
                                            <button type="submit"
                                                className={`btn !bg-red-400 !text-slate-900 btn-disabled flex flex-row flex-nowrap text-nowrap`}>
                                                Filtering
                                            </button>
                                        </div>
                                    )
                                    :
                                    (
                                        formik.values &&
                                        <div className={'   flex flex-col justify-end '}>

                                            <FormikSubmit formik={formik} label={'Filter'} />
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PreviousClassFilter

