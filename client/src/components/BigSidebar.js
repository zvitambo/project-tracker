import React from 'react';
import  Wrapper  from "../assets/wrappers/BigSidebar";
import { useAppContext } from "../context/appContext";
import Logo from "./Logo";
import Navlinks from "./Navlinks";


const BigSidebar = () => {
   const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className='content'>
          <header>
            <Logo
              width='180px'
              height='80px'
              marginTop='20px'
              marginBottom='10px'
            />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
 
}

export default BigSidebar