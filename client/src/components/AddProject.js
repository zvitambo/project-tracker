import { FormRow, Alert, FormRowSelect } from "./";
import { FaWpforms } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";

const AddProject = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    // position,
    // company,
    // jobLocation,
    // jobType,
    // jobTypeOptions,
    // status,
    // statusOptions,
    // createJob,
    //editJob,
    handleChange,
    clearValues,

    //Projects
    name,
    description,
    projectCategory,
    projectCategoryOptions,
    projectStatus,
    projectStatusOptions,
    createProject,
    editProject,
  } = useAppContext();

  const handleProjectInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description ) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editProject();
      return;
    }
    createProject();
  };

  return (
    <Wrapper>
      <form className='form'>
        <h3 className='form-text-header'>
          <span className='icon'>
            {<FaWpforms />}
            {isEditing ? " edit project" : " add project"}
          </span>
        </h3>
        {showAlert && <Alert />}
        <hr className='hr-center' />
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={handleProjectInput}
          />
          <FormRow
            type='text'
            name='description'
            value={description}
            handleChange={handleProjectInput}
          />

          <FormRowSelect
            name='projectCategory'
            labelText='category'
            value={projectCategory}
            handleChange={handleProjectInput}
            list={projectCategoryOptions}
          />

          <FormRowSelect
            name='projectStatus'
            labelText='status'
            value={projectStatus}
            handleChange={handleProjectInput}
            list={projectStatusOptions}
          />

          <div className='btn-separate-container'>
            <button
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
          <div className='btn-separate-container'>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddProject;
