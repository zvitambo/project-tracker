import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholderText,
  editable,
}) => {
  return (
    <>
      <div className='form-row'>
        {/* <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label> */}

        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='form-input switch-checkbox'
          placeholder={placeholderText}
          id={`switch`}
          disabled={!editable}
        />
        {labelText || name}

        <label
          style={{
            background: "#2cb1bc",
          }}
          className='switch-label'
          htmlFor={`switch`}
        >
          {" "}
          <span className={`switch-button`}></span>
        </label>
      </div>
    </>
  );
};

export default FormRow;
