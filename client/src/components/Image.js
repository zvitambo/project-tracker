import React from 'react'

const Image = ({url, description}) => {
  return (
    <div>
      <img src={url} alt='' />
      <p className='legend'>{description}</p>
    </div>
  );
}

export default Image