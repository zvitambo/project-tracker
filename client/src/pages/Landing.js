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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            sunt ipsa nam veritatis reprehenderit facilis voluptatem, itaque
            magni mollitia dolorum molestias tempore architecto sed facere
            distinctio ipsum soluta. Quibusdam quo blanditiis totam.
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
