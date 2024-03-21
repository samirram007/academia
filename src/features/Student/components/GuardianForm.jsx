import { useFormik } from "formik";
import { useGuardianType } from "../../../hooks/queries";
import { useStoreStudentGuardianMutation, useUpdateStudentGuardianMutation } from "../hooks/mutations";
import { FormikInputBox, FormikSelect, FormikSubmit } from "../../../components/form-components";
import { useState } from "react";
import FormikFormModal from "../../../components/form-components/FormikFormModal";
import { MdClose, MdOutlineCloseFullscreen } from "react-icons/md";

const GuardianForm = ({ mode, guardian, student_id, setMode, }) => {

    const [open, setOpen] = useState(true);
    const guardianTypeData = useGuardianType();
    const studentGuardianStoreMutation = useStoreStudentGuardianMutation();
    const studentGuardianUpdateMutation = useUpdateStudentGuardianMutation();
    if (guardianTypeData.isPending) {
        return '<div>Loading..</div>'
    }
    if (guardianTypeData.isError) {
        return <div>{guardianTypeData.error.message}</div>
    }


    const initialValues = guardian
    const handleFormSubmit = (values) => {
        if (mode === 'add') {
            studentGuardianStoreMutation.mutate(values)
            studentGuardianStoreMutation.onSuccess ;
            {
                    setOpen(false)
                    setMode('list')
                }

        } else {
            studentGuardianUpdateMutation.mutate(values)
            studentGuardianUpdateMutation.onSuccess ;
            {
                    setOpen(false)
                    setMode('list')
                }
        }
    }
    const formikGuardian = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: values => {
            const newValues = { ...initialValues, ...values }
            console.log(newValues);
            handleFormSubmit(newValues)
        }
    })
    const handleClose = () => {
        setOpen(false);
        setMode('list')

    };



    return (

        <FormikFormModal isOpen={open} onClose={handleClose}>
            <div className='flex justify-between items-center border-b-2 border-slate-600/50 pb-2   ' >
                <div>New Guardian</div>
                <button onClick={handleClose} type="button"
                    className='rounded-full p-2
                 bg-slate-50/5 text-orange-500 cursor-pointer
                  hover:text-yellow-500 hover:bg-slate-600
                   active:text-orange-600 active:touch-pinch-zoom '>
                    <MdOutlineCloseFullscreen className='text-xl active:scale-90 transition delay-75 ease-in-out ' />
                </button>
            </div>
            <form onSubmit={formikGuardian.handleSubmit}>
                <div className="grid grid-cols-2 gap-4 ">
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
                        <FormikInputBox formik={formikGuardian} name="name" label="Name" />
                    </div>
                    <div className="">
                        <FormikInputBox formik={formikGuardian} name="contact_no" label="Contact Number" />
                    </div>
                    <div className="">
                        <FormikInputBox formik={formikGuardian} name="email" label="Email" />
                    </div>
                    <div className="col-span-2 mx-auto">
                        <FormikSubmit formik={formikGuardian} label={"Save"} />
                    </div>
                </div>


            </form>
        </FormikFormModal>
    )




}
export default GuardianForm;