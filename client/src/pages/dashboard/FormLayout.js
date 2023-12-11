import React from "react";
import {
FeatureContainer,
  AddProject,
  // AddFeature
} from "../../components";
 import { useAppContext } from "../../context/appContext";

const FormLayout = () => {
    

   const {
     isEditing,
     isProject
   } = useAppContext();
  
  return (
    <>

      <AddProject />
      {(isProject && isEditing) && <FeatureContainer />}
    </>
  );
};

export default FormLayout;
