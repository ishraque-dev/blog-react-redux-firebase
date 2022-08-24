import React from 'react';

const Input = ({ input, onChange }) => {
  return (
    <input
      {...input}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '10px 10px',
        marginBottom: '10px',
        borderRadius: '10px',
        border: 'none',
        outline: 'none',
      }}
    />
  );
};

export default Input;
