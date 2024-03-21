import { useState, useEffect } from 'react';

const useDebouncedFormik = (formik, delay = 500) => {
  const [debouncedFormik, setDebouncedFormik] = useState(formik);

  useEffect(() => {
    const handler = setTimeout(() => {
      console.log(formik.values.name);
      setDebouncedFormik(formik);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [formik, delay]);

  return debouncedFormik;
};

export default useDebouncedFormik;