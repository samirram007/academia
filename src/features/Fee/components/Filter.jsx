
import { useFormik } from 'formik';

import { FormikInputBox } from '@/components/form-components/FormikInputBox';
import { FormikSubmit } from '@/components/form-components/FormikSubmit';
import * as Yup from "yup";
import { AcademicSessionSelect } from '../../Common/components/AcademicSessionSelect';





const validationSchema = Yup.object().shape({
    campus_id: Yup.number().integer()
    //     .min(1, "Please select Campus")
    //     .required("Please select Campus"),
    // academic_session_id: Yup.number().integer()
    //     .min(1, "Please select Academic session")
    //     .required("Please select Academic session"),
    // academic_class_id: Yup.number().integer()
    //     .min(1, "Please select Class")
    //     .required("Please select Class")
})


const Filter = ({ FeeData, initialFilterValues, setFilterReady }) => {



    //  console.log(initialFilterValues);
    // console.log(DateTime.fromISO(new Date().toLocaleString(DateTime.DATE_MED) ));
    //  const mData = FeeData.data?.data ?? [];
    const formik = useFormik({
        initialValues: initialFilterValues,
        // validationSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting }) => {
            Object.assign(initialFilterValues, values)
            FeeData.refetch()
            setSubmitting(false)
            FeeData.data ?? setFilterReady(true)
        },
        onError: (errors, values, { setSubmitting }) => {
            setSubmitting(false)

        }
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-1  '>
                    <div className='grid grid-flow-row md:grid-flow-col grid-cols-6 gap-5'>
                        <div className='grid gap-4 col-span-6    px-4  '>
                            <div className='grid gap-4 grid-cols-12   '>
                                {/* <div className='col-span-1 text-md font-bold'>Filter</div> */}

                                <div className='col-span-2 '>

                                    <AcademicSessionSelect formik={formik} />

                                </div>
                                <div className='col-span-2 '>

                                    <FormikInputBox type={'date'} formik={formik} name={'from'} label={'From'} />

                                </div>
                                <div className='col-span-2 '>

                                    <FormikInputBox type={'date'} formik={formik} name={'to'} label={'To'} />

                                </div>




                                {FeeData.isRefetching ?
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
                                <div className='col-span-3 '>  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Filter

