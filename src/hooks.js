import { useState } from 'react';

const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

export { useInput };
