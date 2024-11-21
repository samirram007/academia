import { useFormik } from "formik";

import FormikEmptyModal from "@/components/form-components/FormikEmptyModal";
import { FormikInputBox } from "@/components/form-components/FormikInputBox";
import { FormikSelect } from "@/components/form-components/FormikSelect";
import { FormikSubmit } from "@/components/form-components/FormikSubmit";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useGuardianType } from "../../../hooks/queries";
import { useStoreStudentGuardianMutation, useUpdateStudentGuardianMutation } from "../hooks/mutations";
// const FormikFormModal = lazy(() => import('@/components/form-components/FormikFormModal'))
const GuardianForm = (props) => {
    const { guardian, mode, setMode, isModalOpen, setModalOpen } = props


    const guardianTypeData = useGuardianType();
    const studentGuardianStoreMutation = useStoreStudentGuardianMutation();
    const studentGuardianUpdateMutation = useUpdateStudentGuardianMutation();



    const initialValues = guardian

    const handleFormSubmit = (values) => {
        if (mode === 'add') {
            studentGuardianStoreMutation.mutate(values)
            studentGuardianStoreMutation.onSuccess;
            {
                setModalOpen(false)
                setMode('list')
            }

        }
        else if (mode === 'edit') {
            studentGuardianUpdateMutation.mutate(values)
            studentGuardianUpdateMutation.onSuccess;
            {
                setModalOpen(false)
                setMode('list')
            }
        }
    }
    const formikGuardian = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: values => {
            const newValues = { ...initialValues, ...values }
            handleFormSubmit(newValues)
        }
    })
    const handleClose = () => {
        setModalOpen(false);
        setMode('list')

    };





    return (

        <FormikEmptyModal isModalOpen={isModalOpen}  >
            <div className="flex flex-col relative h-dvh bg-slate-800 ">


                <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-2 pl-2  ' >
                    <div className="text-xl font-bold text-orange-400">New Guardian</div>
                    <button onClick={handleClose} type="button"
                        className='rounded-full p-2
                 bg-slate-50/5 text-orange-500 cursor-pointer
                  hover:text-yellow-500 hover:bg-slate-600
                   active:text-orange-600 active:touch-pinch-zoom '>
                        <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                    </button>
                </div>
                <div className="h-full bg-zinc-900 p-4 ">

                    <form onSubmit={formikGuardian.handleSubmit} className="h-full ">

                        <div className="h-full relative  ">
                            <div className="grid grid-cols-2 gap-4 justify-start items-start">
                                <div className="">

                                    <FormikInputBox formik={formikGuardian} name="name" label="Name" />
                                </div>
                                <div className="">
                                    {guardianTypeData.data &&
                                        <FormikSelect formik={formikGuardian} name="guardian_type" label="Type"
                                            options={
                                                guardianTypeData.data.data && Object.entries(guardianTypeData.data.data).map(([key, value], index) => (
                                                    <option key={index} value={key}>{value}</option>
                                                ))
                                            } />
                                    }
                                </div>

                                <div className="">
                                    <FormikInputBox formik={formikGuardian} name="contact_no" label="Contact Number" />
                                </div>
                                <div className="">
                                    <FormikInputBox formik={formikGuardian} name="email" label="Email" />
                                </div>
                                <div className="">
                                    <FormikInputBox formik={formikGuardian} name="occupation" label="Occupation" />
                                </div>
                                <div className="">
                                    <FormikInputBox formik={formikGuardian} name="education" label="Education" />
                                </div>
                                <div className="">
                                    <FormikInputBox formik={formikGuardian} name="earnings" label="Earnings" />
                                </div>
                            </div>

                            <div className="col-span-2 mx-auto absolute bottom-0 p-4 w-full 
                            flex justify-center border-t-2 border-slate-600/50">
                                <FormikSubmit formik={formikGuardian} label={"Save"} className="w-1/2 !p-4" />
                            </div>

                        </div>




                    </form>
                </div>

            </div>
        </FormikEmptyModal >
    )




}
export default GuardianForm;