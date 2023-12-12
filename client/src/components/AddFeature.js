import React, {  useState } from "react";
import { FormRow, Alert, FormRowSelect } from "./";
import { FaWpforms } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
//import { redirect } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UploadImage from "./UploadImage";
import ImageDisplay from "./ImageDisplay";
import FormButtonLayout from "./FormButtonLayout";

const AddFeature = () => {
  const {
    isLoading,
    isEditingFeature,
    showAlert,
    displayAlert,
    name, //product name
    handleChange,
    clearValues,
    // Features
    featureName,
    featureDescription,
    featureCategoryOptions,
    featureCategory,
    featureStatusOptions,
    featureStatus,
    createFeature,
    editFeature,
    // featureExpenditureBalance,
    debitTransactionAmount,
    debitTransactionStatus,
    debitTransactionDescription,
    transactionStatusOptions,
    createDebitTransaction,
    expenditure,
    uploadAttachment,
    // formData,
    imageDescription,
    // imageStatusOptions,
    imageStatus,
    //imageOwner,
    // createImage,
  } = useAppContext();

  const handleInput = (e) => {
    const name = e.target.name;
    // let value = "";
    // if (name === "debitTransactionHasReceipt") {
    //   value = e.target.checked;
    // } else {
    //   value = e.target.value;
    // }
    const value = e.target.value;
    console.log(name, value);
    handleChange({ name, value });
  };
  const [tabIndex, setTabIndex] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!featureName || !featureDescription) {
      displayAlert();
      return;
    }
    if (isEditingFeature) {
      editFeature();

      return;
    }

    createFeature();
  };

  // const handleImageUpload = (e) => {
  //   if (e.target.files[0]) {
  //     const imageFile = e.target.files[0];
  //     formData.append("image", imageFile);

  //     for (let key in formData.entries()){
  //       console.log(key[0], key[1]);
  //     }
  //   }
  // };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();

    if (uploadAttachment) {
      if (!imageDescription || !imageStatus) {
        displayAlert();
        return;
      }

      createDebitTransaction();

      //createImage();
    } else {
      if (
        !featureName ||
        !featureDescription ||
        !featureCategory ||
        !featureStatus
      ) {
        displayAlert();
        return;
      }

      createDebitTransaction();
    }
  };

  return (
    <Wrapper>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>
            {" "}
            <h5 className='form-text-header'>task/feature</h5>
          </Tab>
          <Tab disabled={!isEditingFeature}>
            <h5 className='form-text-header'>expenditure</h5>
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
                {name &&
                  (isEditingFeature
                    ? " edit feature"
                    : ` ${name} -> add task \\ feature`)}
                {!name &&
                  (isEditingFeature ? " edit feature" : ` add task \\ feature`)}

                {/* {!isProject && isEditing ? " edit feature" : " add feature"}
            {isEditing ? " edit project" : " add project"} */}
              </span>
            </h3>

            {showAlert && <Alert />}

            <hr className='hr-center' />
            <div className='form-center'>
              <FormRow
                type='text'
                name='featureName'
                value={featureName}
                handleChange={handleInput}
                labelText='name'
              />
              <FormRow
                type='text'
                name='featureDescription'
                value={featureDescription}
                handleChange={handleInput}
                labelText='description'
              />

              <FormRowSelect
                name='featureCategory'
                labelText='category'
                value={featureCategory}
                handleChange={handleInput}
                list={featureCategoryOptions}
              />

              <FormRowSelect
                name='featureStatus'
                labelText='status'
                value={featureStatus}
                handleChange={handleInput}
                list={featureStatusOptions}
              />

              {<UploadImage />}
              <FormButtonLayout
                singleDiv={true}
                isLoading={isLoading}
                handleSubmit={handleSubmit}
                clearValues={clearValues}
              />

              {/* <div className='btn-separate-container'>
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
              </div> */}
            </div>
          </form>
        </TabPanel>
        <TabPanel>
          <form className='form'>
            <h3 className='form-text-header'>
              <span className='icon'>
                {<FaWpforms />}
                {` Add Expenditure`}
              </span>
            </h3>
            <h4 className='money-balance'>
              current expenditure: {`${expenditure}`}
            </h4>
            {showAlert && <Alert />}

            <hr className='hr-center' />
            <div className='form-center'>
              <FormRow
                type='number'
                name='debitTransactionAmount'
                value={debitTransactionAmount}
                handleChange={handleInput}
                labelText='amount'
              />
              <FormRow
                type='text'
                name='debitTransactionDescription'
                value={debitTransactionDescription}
                handleChange={handleInput}
                labelText='description'
                placeholderText={"please add a description of the expenditure"}
              />
              <FormRowSelect
                name='debitTransactionStatus'
                labelText='status'
                value={debitTransactionStatus}
                handleChange={handleInput}
                list={transactionStatusOptions}
              />
              <UploadImage />
              {/* {
                <FormCheckBox
                  type='checkbox'
                  name='debitTransactionHasReceipt'
                  value={debitTransactionHasReceipt}
                  handleChange={handleInput}
                  labelText='Has Receipt ?'
                />
              }
              {debitTransactionHasReceipt && (
                <>
                  
                  <FormRow
                    type='text'
                    name='imageDescription'
                    value={imageDescription}
                    handleChange={handleInput}
                    labelText='description'
                    placeholderText={"please add a description of the image"}
                  />
                  <FormRowSelect
                    name='imageStatus'
                    labelText='status'
                    value={imageStatus}
                    handleChange={handleInput}
                    list={imageStatusOptions}
                  />

                  <input
                    className='form-input'
                    type='file'
                    id='file'
                    onChange={handleImageUpload}
                  />
                </>
              )} */}

              <div className='btn-container'>
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

export default AddFeature;
