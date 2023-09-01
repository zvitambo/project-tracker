/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import Job from "./Job";
import Project from "./Project";
import PageBtnContainer from "./PageBtnContainer";

const ProjectFeatureContainer = ({ isProject }) => {
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
    projectCategory,
  } = useAppContext();

  useEffect(() => {
    getProjects();
  }, [search, searchStatus, projectCategory, sort, searchByProject, page]);
  if (isLoading) {
    return <Loading center />;
  }
  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display ....</h2>
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
