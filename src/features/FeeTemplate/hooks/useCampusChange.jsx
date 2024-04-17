import { queryClient } from "../../../utils/queryClient";


const useCampusChange = (formik) => {
// formik.values.academic_session_id=''
// formik.values.academic_class_id=''
  //  queryClient.invalidateQueries(['academic_sessions']);
  //  queryClient.invalidateQueries(['academic_classes']);
  return formik;
};

export default useCampusChange;