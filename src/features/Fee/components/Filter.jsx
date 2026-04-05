
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
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap items-end gap-4 px-5 py-3'>
                <div className='w-48'>
                    <AcademicSessionSelect formik={formik} />
                </div>
                <div className='w-44'>
                    <FormikInputBox type={'date'} formik={formik} name={'from'} label={'From'} />
                </div>
                <div className='w-44'>
                    <FormikInputBox type={'date'} formik={formik} name={'to'} label={'To'} />
                </div>
                {FeeData.isRefetching ? (
                    <button type="submit" disabled
                        className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold bg-amber-400/60 text-slate-700 cursor-not-allowed opacity-70 whitespace-nowrap">
                        Filtering
                    </button>
                ) : (
                    formik.values &&
                        <FormikSubmit formik={formik} label={'Filter'} />
                )}
            </div>
        </form>
    )
}

export default Filter

