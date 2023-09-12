/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Project from "./Project";
import PageBtnContainer from "./PageBtnContainer";

const ProjectFeatureContainer = () => {
  const {
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    getProjects,
    projects,
    totalProjects,
    searchByProject,
    isEditing,
    editProjectId,
  } = useAppContext();


  useEffect(() => {
    getProjects();
  }, [
    search,
    searchStatus,
    searchType,
    sort,
    searchByProject,
    page,
    isEditing,
    editProjectId,
  ]);

  if (isLoading) {
    return <Loading center />;
  }

 
  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No projects to display ....</h2>
      </Wrapper>
    );
  }


  

  return (
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
  );
};

export default ProjectFeatureContainer;
