import { useState, useEffect } from 'react';

const useDebouncedFormik = (formik, delay = 500) => {
  const [debouncedFormik, setDebouncedFormik] = useState(formik);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFormik(formik);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [formik, delay]);

  return debouncedFormik;
};

export default useDebouncedFormik;