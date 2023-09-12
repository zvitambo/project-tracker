import { FormRow, Alert, FormRowSelect } from "./";
import { FaWpforms } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AddProject = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    handleChange,
    clearValues,
    name,
    description,
    projectCategory,
    projectCategoryOptions,
    projectStatus,
    projectStatusOptions,
    createProject,
    editProject,
    setIsFeature,
    editProjectId,
    creditTransactionAmount,
    transactionStatusOptions,
    creditTransactionStatus,
    creditTransactionTypeOptions,
    creditTransactionType,
    creditTransactionOwnerId,
    createCreditTransaction,
    users,
    projectRunningBalance,
  } = useAppContext();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name, value });
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !projectCategory || !projectStatus) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editProject();
      return;
    }
    createProject();
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();

    console.log(
      "creditTransactionAmount,creditTransactionStatus, creditTransactionType , creditTransactionOwnerId",
      creditTransactionAmount,
      creditTransactionStatus,
      creditTransactionType,
      creditTransactionOwnerId,
      isEditing
    );
    if (
      !creditTransactionAmount ||
      !creditTransactionStatus ||
      !creditTransactionType ||
      !creditTransactionOwnerId
    ) {
      displayAlert();
      return;
    }
    // if (isEditing) {
    //  // editProject();
    //   return;
    // }
    createCreditTransaction();
  };

  return (
    <Wrapper>
      <Tabs>
        <TabList>
          <Tab>
            {" "}
            <h5 className='form-text-header'>project details</h5>
          </Tab>
          <Tab disabled={!isEditing}>
            <h5 className='form-text-header'>funding</h5>
          </Tab>
        </TabList>

        <TabPanel>
          <form className='form'>
            <h3 className='form-text-header'>
              <span className='icon'>
                {<FaWpforms />}
                {isEditing ? " edit project" : " add project"}
              </span>
            </h3>
            {showAlert && <Alert />}
            {isEditing && (
              <Link
                to='/add-feature'
                className='btn add-feature'
                onClick={(e) => {
                  //e.preventDefault();
                  setIsFeature(editProjectId);
                }}
              >
                add task/feature
              </Link>
            )}

            <hr className='hr-center' />
            <div className='form-center'>
              <FormRow
                type='text'
                name='name'
                value={name}
                handleChange={handleInput}
              />
              <FormRow
                type='text'
                name='description'
                value={description}
                handleChange={handleInput}
              />

              <FormRowSelect
                name='projectCategory'
                labelText='category'
                value={projectCategory}
                handleChange={handleInput}
                list={projectCategoryOptions}
              />

              <FormRowSelect
                name='projectStatus'
                labelText='status'
                value={projectStatus}
                handleChange={handleInput}
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
        </TabPanel>
        <TabPanel>
          <form className='form'>
            <h3 className='form-text-header'>
              <span className='icon'>
                {<FaWpforms />}
                {" add transaction"}
              </span>
            </h3>
            <h4 className='money-balance'>
              operating balance: {`$ ${projectRunningBalance}`}
            </h4>
            {showAlert && <Alert />}

            <hr className='hr-center' />
            <div className='form-center'>
              <FormRow
                type='number'
                name='creditTransactionAmount'
                value={creditTransactionAmount}
                handleChange={handleInput}
                labelText='amount'
              />

              <FormRowSelect
                name='creditTransactionStatus'
                labelText='status'
                value={creditTransactionStatus}
                handleChange={handleInput}
                list={transactionStatusOptions}
              />

              <FormRowSelect
                name='creditTransactionType'
                labelText='types'
                value={creditTransactionType}
                handleChange={handleInput}
                list={creditTransactionTypeOptions}
              />
              <FormRowSelect
                labelText='Investor/Contributor'
                name='creditTransactionOwnerId'
                value={creditTransactionOwnerId}
                handleChange={handleInput}
                list={["Please select an Investor/Contributor", ...users]}
              />
              <div className='btn-separate-container'>
                <button
                  className='btn btn-block submit-btn'
                  onClick={handleSubmitTransaction}
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
        </TabPanel>
      </Tabs>
    </Wrapper>
  );
};

export default AddProject;
