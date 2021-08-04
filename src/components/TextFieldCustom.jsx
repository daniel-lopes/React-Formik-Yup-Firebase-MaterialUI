import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import fetchZipCodeInformation from '../services/zipCode';

const TextFieldCustom = props => {
  const [valueField, setValueField] = useState();

  const getZipCode = async value => {
    const validateZipCode = /^[0-9]{8}$/;
    if (validateZipCode.test(value)) {
      const result = await fetchZipCodeInformation(value);
      props.form.setValues({
        ...props.form.values,
        estado: result.estado,
        municipio: result.municipio,
        rua: result.rua
      });
    }
  };

  const handleChange = value => {
    setValueField(value.target.value);
    props.form.setFieldValue(props.field.name, value.target.value);
    if (props.field.name === 'cep' && (value.target.value.length === 8 || value.target.value.length === 9)) {
      getZipCode(value.target.value);
    }
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