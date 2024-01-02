import React from "react";
import { Link } from "react-router-dom";

import main from "../assets/images/main.svg";
import Wrapper from '../assets/wrappers/LandingPage';
//import { Logo } from '../components';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/* <div className='info'>
          {" "}
          <Logo />
        </div> */}
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            <span>jindu</span> project <span>tracking</span>
          </h1>
          <p>
            Welcome to my family project tracker. This app was inspired by the
            need to create a multi purpose platform for tracking all sorts of
            projects, events and tasks to be carried out for the family. Giving
            access to projects or task statuses from anywhere in the world, as
            well as providing funding, investment and expenditure accountability
            and tracking. Renovations, Legal processes (like estate processes), 
            funeral , birthday party, family get together, family trip
            planning ...the list goes on. Its a pretty flexible platform 👌👌👌
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};



export default Landing;
