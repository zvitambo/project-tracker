/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react'
import { useAppContext } from "../../context/appContext";
import { ProjectStatsContainer, ChartsContainer, Loading } from "../../components";

const Stats = () => {

  const {
    showProjectFeatureStats,
    showProjectStats,
    isLoading,
    monthlyProjects,
    getProjects,
    getUsers,
  } = useAppContext();
  useEffect(()=>{
    showProjectStats();
    showProjectFeatureStats();
    getProjects();
    getUsers();
  }, [])

  if (isLoading) return <Loading center/>
  return (
    <>
      <ProjectStatsContainer />
      {monthlyProjects.length > 0 && <ChartsContainer />}
    </>
  );
}

export default Stats