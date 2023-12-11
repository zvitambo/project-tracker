import logo from "../assets/images/jpt.svg";
import React from 'react'

const Logo = ({ width, height, marginTop, marginBottom}) => {


  
 return(
    <img
      src={logo}
      alt='project tracker'
      className={logo}
      style={{
        width: width,
        height: height,
        marginTop: marginTop,
        marginBottom,
      }}
    />
  );
};

export default Logo