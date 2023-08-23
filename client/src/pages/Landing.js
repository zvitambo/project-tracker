import React from "react";
import { Link } from "react-router-dom";

import main from "../assets/images/main-alternative.svg";
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';
const Landing = () => {
  return (
    <Wrapper >
      <nav>
       <Logo/>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            sunt ipsa nam veritatis reprehenderit facilis voluptatem, itaque
            magni mollitia dolorum molestias tempore architecto sed facere
            distinctio ipsum soluta. Quibusdam quo blanditiis totam.
          </p>
          <Link to='/register' className='btn btn-hero'>Login/Register</Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};



export default Landing;
