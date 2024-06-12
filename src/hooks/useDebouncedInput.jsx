import { useState, useEffect } from 'react';

const useDebouncedInput = (input, delay = 500) => {
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFormik(input);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [input, delay]);

  return debouncedInput;
};

export default useDebouncedInput;