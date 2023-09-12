/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Feature from "./Feature";
import PageBtnContainer from "./PageBtnContainer";

const FeatureContainer = () => {
  const {
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    getFeatures,
    features,
    totalFeatures,
    searchByFeature,
    isEditing,
    editProjectId,
  } = useAppContext();

 
  useEffect(() => {
    getFeatures();
  }, [
    search,
    searchStatus,
    searchType,
    sort,
    searchByFeature,
    page,
    isEditing,
    editProjectId,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

  
  if (features.length === 0) {
    return (
      <Wrapper>
        <h2>No features to display ....</h2>
      </Wrapper>
    );
  }


  
 return (
   <Wrapper>
     <h5>
       {totalFeatures} feature{features.length > 1 && "s"} found
     </h5>
     <div className='jobs'>
       {features.map((feature) => {
         return <Feature key={feature._id} {...feature} />;
       })}
     </div>
     {numOfPages > 1 && <PageBtnContainer />}
   </Wrapper>
 );
};

export default FeatureContainer;
