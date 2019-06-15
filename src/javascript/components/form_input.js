import React from 'react';

const TextInput = ({className, type, inputName, placeholder, errors, onChange, values}) => {
  return (
    <input 
      className={`${className} ${(errors[inputName] ? 'register-form__input--error' : '')}`} 
      type={ type } 
      name={ inputName }
      placeholder={ placeholder } 
      onChange={(e => onChange(e))} 
    />
  );
};

export default TextInput;