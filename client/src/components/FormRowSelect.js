import React from 'react'

const FormRowSelect = ({name,value,  labelText,handleChange, list, editable}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        className='form-select'
        value={value}
        onChange={handleChange}
        disabled={!editable}
      >
        {list.map((itemValue, index) => {
          if (typeof itemValue === 'object'){
            return (
              <option key={itemValue._id} value={itemValue._id}>
                {itemValue.name}
              </option>
            );
          }
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect