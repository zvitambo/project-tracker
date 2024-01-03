/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { FormRow, Alert, FormRowSelect } from "./";
import { FaWpforms } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UploadImage from "./UploadImage";
import ImageDisplay from "./ImageDisplay";
import FormButtonLayout from "./FormButtonLayout";

//import { useEffect } from "react";

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
    uploadAttachment,
    imageDescription,
    imageStatus,
    operatingBalance,
    funding,
  } = useAppContext();



  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    if (uploadAttachment) {
      if (!imageDescription || !imageStatus) {
        displayAlert();
        return;
      }
    }

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
            <h5 className='form-text-header'>project details</h5>
          </Tab>
          <Tab disabled={!isEditing}>
            <h5 className='form-text-header'>funding</h5>
          </Tab>
          <Tab>
            <h5 className='form-text-header'>Attachments</h5>
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
            {isEditing && (
              <h4 className='money-balance'>
                <span className='money-balance-span'>Operating</span> Balance:{" "}
                {` ${operatingBalance}`}
              </h4>
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
              {<UploadImage />}
              <FormButtonLayout
                singleDiv={true}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                clearValues={clearValues}
              />

              {/* <div className={isEditing ? 'btn-container': ''}>
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
              </div> */}
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

            <h4 className='money-balance'>funding to date: {` ${funding}`}</h4>

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
        <TabPanel>
          <ImageDisplay />
        </TabPanel>
      </Tabs>
    </Wrapper>
  );
};

export default AddProject;