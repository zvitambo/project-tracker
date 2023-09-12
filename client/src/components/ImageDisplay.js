/* eslint-disable react-hooks/exhaustive-deps */
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "./Image";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
const ImageDisplay = () => {
  const { images, getImages } = useAppContext();

  useEffect(()=>{
    getImages()
  },[])
  return (
    <>
      <hr className='hr-center' />
      <div className='form-center-image'>
        <div className='form-center-image-child'>
          <Carousel width={270} showThumbs={false}>
            <div>
              <img src='/uploads/grinch.png' alt='' />
              <p className='legend'>Legend 1</p>
            </div>
            <div>
              <img src='/uploads/Kikky-BadAss-004.jpg' alt='' />
              <p className='legend'>Legend 2</p>
            </div>

            {images && images.map((image, index) => {
                console.log("images", image);
             return ( <Image
                key={index}
                url={image.url}
                description={image.description}
              />)
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ImageDisplay;
