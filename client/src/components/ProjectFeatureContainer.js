/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Project from "./Project";
import Feature from "./Feature";
import PageBtnContainer from "./PageBtnContainer";

const ProjectFeatureContainer = () => {
  const {
    isLoading,
    page,
    search,
    searchStatus,
    sort,
    numOfPages,
    getProjects,
    projects,
    totalProjects,
    searchByProject,
    getFeatures,
    features,
    totalFeatures,
    searchByFeature,
    isProject,
    isEditing,
    editProjectId,
  } = useAppContext();


  console.log("isProject", isProject);
  console.log("!isEditing", !isEditing);
  console.log("editProjectId", editProjectId);
  useEffect(() => {

    if (isProject && !isEditing && editProjectId === "") {
      getProjects();
      
    } else {
      getFeatures();
    }
    
  }, [search, searchStatus, sort, searchByProject,searchByFeature,  page, isEditing, editProjectId]);

  if (isLoading) {
    return <Loading center />;
  }

   console.log("projects", projects);
  if (isProject && projects.length === 0) {
    return (
      <Wrapper>
        <h2>No {isProject ? "projects" : "features"} to display ....</h2>
      </Wrapper>
    );
  }
 console.log("features", features);
   if (!isProject && features.length === 0) {
     return (
       <Wrapper>
         <h2>No {isProject ? "projects" : "features"} to display ....</h2>
       </Wrapper>
     );
   }

  const renderedWrapper = () => {
    return isProject && !isEditing && editProjectId === "" ? (
      <Wrapper>
        <h5>
          {totalProjects} project{projects.length > 1 && "s"} found
        </h5>
        <div className='jobs'>
          {projects.map((project) => {
            return <Project key={project._id} {...project} />;
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
      </Wrapper>
    ) : (

      features.length > 0 &&
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
  } 

  //console.log("renderedWrapper()", renderedWrapper());

  return renderedWrapper(); 
  // console.log("projects", projects);
  // return (
  //   <Wrapper>
  //     <h5>
  //       {totalProjects} project{projects.length > 1 && "s"} found
  //     </h5>
  //     <div className='jobs'>
  //       {projects.map((project) => {
  //         return <Project key={project._id} {...project} />;
  //       })}
  //     </div>
  //     {numOfPages > 1 && <PageBtnContainer />}
  //   </Wrapper>
  // );


    
};

export default ProjectFeatureContainer;
