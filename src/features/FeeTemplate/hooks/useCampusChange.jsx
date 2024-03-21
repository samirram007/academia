import { queryClient } from "../../../utils/queryClient";


const useCampusChange = (formik) => {
// formik.values.academic_year_id=''
// formik.values.academic_class_id=''
//  console.log("Formik Value State on campus id Change",formik.values) ;
  //  queryClient.invalidateQueries(['academic_years']);
  //  queryClient.invalidateQueries(['academic_classes']);
  return formik;
};

export default useCampusChange;