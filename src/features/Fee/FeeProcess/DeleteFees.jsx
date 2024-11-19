import { useDeleteFeeMutation } from "../hooks/mutations";

const DeleteFees = ({ userData, fees, isOpen, setOpen, selectedStudentSession = fees.student_session }) => {
  const deleteStudentFeeMutation = useDeleteFeeMutation()
  const deleteFees = () => {
    const payload = {
      id: fees.id
    }
    deleteStudentFeeMutation.mutate(payload),
    {
      onSuccess: (data) => {
        setOpen(false)
      },
      onError: (error) => {
        toast.error(error.response.data.message, { transition: Flip })
      }
    }
    // setOpen(false)
  }
  return (
    <div className="flex flex-col justify-center items-center h-full">


      <div className="text-3xl font-bold text-red-500">Are you sure you want to cancel this Fees?</div>
      <div className=" text-2xl  bg-error py-2 px-4 rounded-md mt-2 text-slate-800 font-bold
      cursor-pointer
      transition duration-200
      hover:text-white/50
      hover:font-bolder
      hover:shadow-lg      
      hover:shadow-error/50
      hover:bg-error/80 
      "
        onClick={deleteFees}
      >Confirm</div>
    </div>
  )
}

export default DeleteFees