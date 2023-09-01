import React from "react";
import { 
  ProjectFeatureContainer, 
  AddProject, 
  AddFeature } from "../../components";
  import { useAppContext } from "../../context/appContext";

const FormLayout = ({isProject = true}) => {
    

   const {
     isEditing,    
   } = useAppContext();
   console.log("isEditing", isEditing);
  return (
    <>
      {isProject ? <AddProject/> : <AddFeature/>}
      {!isEditing && <ProjectFeatureContainer isProject={isProject} />}
    </>
  );
};

export default FormLayout;
