import React from 'react';

const FormErrorMsg = ({errorMsg}) => {
  return (
    <p className="form-error-message">{errorMsg}</p>
  );
}

export default FormErrorMsg;