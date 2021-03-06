import React, { Fragment } from 'react';

const TextInput = ({className, type, inputName, placeholder, errors, onChange, labelText, valuesPos, exercisesPos}) => (
  <Fragment>
    { labelText && (
      <label
        className={`${className}__label`}
        htmlFor={inputName}
      >
        { labelText }
      </label>
    )}
    <input
      className={`${className}__input ${(errors[inputName] ?  `${className}__input--error` : '')}`}
      type={ type }
      name={ inputName }
      placeholder={ placeholder }
      onChange={(e) => onChange(e, valuesPos, exercisesPos)}
    />
  </Fragment>
);

export default TextInput;
