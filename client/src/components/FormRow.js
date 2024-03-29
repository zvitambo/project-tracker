import React from 'react'

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholderText,
//  editable,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        placeholder={placeholderText}
      //  disabled={!editable}
      />
    </div>
  );
};

export default FormRow