import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

const TextFieldCustom = props => {
  const [valueField, setValueField] = useState();

  const handleChange = value => {
    setValueField(value.target.value);
    props.form.setFieldValue(props.field.name, value.target.value);
  };

  const errorMessage = () => {
    if (props.form.submitCount && Object.keys(props.form.errors).length) {
      return props.form.errors[props.field.name];
    }
    return '';
  };

  const checkError = () => {
    if (props.form.submitCount && Object.keys(props.form.errors).length) {
      if (props.form.errors[props.field.name]) {
        return true;
      }
    }
    return false;
  };

  if (props.mode && props.mode !== 'register') {
    return null;
  }

  return (
    <TextField
      label={props.label}
      margin="dense"
      variant="outlined"
      value={valueField || props.field.value || ''}
      helperText={errorMessage()}
      error={checkError()}
      type={props.type}
      fullWidth
      onChange={value => handleChange(value)}
    />
  );
}

export default TextFieldCustom;