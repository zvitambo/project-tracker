import logo from "../assets/images/jpt.svg";
import React, {useEffect, useState} from 'react'

const Logo = ({
  width,
  height,
  marginTop,
  marginBottom,
  marginLeft
}) => {
const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    if(window.innerWidth <= 600){
     setIsMobile(true);
    }else{
      setIsMobile(false);
    } 
  },[])
  return (
    <img
      src={logo}
      alt='project tracker'
      className={logo}
      style={{
        width: width,
        height: height,
        marginTop: marginTop,
        marginLeft: marginLeft ? marginLeft : isMobile ? "-38px" : "-24px",
        marginBottom,
      }}
    />
  );
};

export default Logo