import React from 'react'

const FormButtonLayout = ({
  singleDiv,
  isLoading,
  handleSubmit,
  clearValues,
}) => {

    const layout = () => {
      return singleDiv ? (
        <div className='btn-container'>
          <div className='btn-separate-container'>
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
          <div className='btn-separate-container'>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className='btn-separate-container'>
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
          <div className='btn-separate-container'>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </>
      );
    }
  return layout();
};

export default FormButtonLayout