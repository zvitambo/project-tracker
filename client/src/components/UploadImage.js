import { FormRow, FormRowSelect, FormCheckBox } from "./";
import { useAppContext } from "../context/appContext";
import "react-tabs/style/react-tabs.css";

const UploadImage = () => {
  const {
    handleChange,
    debitTransactionHasReceipt,
    formData,
    imageDescription,
    imageStatusOptions,
    imageStatus,
  } = useAppContext();

  const handleInput = (e) => {
    const name = e.target.name;
    let value = "";
    if (name === "debitTransactionHasReceipt") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
   
    handleChange({ name, value });
  };



  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      formData.append("image", imageFile);
    
    }
  };



  return (
   
     
        <>
              {
                <FormCheckBox
                  type='checkbox'
                  name='debitTransactionHasReceipt'
                  value={debitTransactionHasReceipt}
                  handleChange={handleInput}
                  labelText='Add Attachment ?'
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
              )}
            
            </>
       
      
    
  );
};

export default UploadImage;
