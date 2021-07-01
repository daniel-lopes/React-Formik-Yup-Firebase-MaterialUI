import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button'

import * as yup from 'yup';

import { validateCPF, validateCep } from 'validations-br';

import { useHistory, useParams } from 'react-router-dom';

import TextFieldCustom from '../../components/TextFieldCustom';

import CheckLogged from '../../CheckLogged';

import CustomMenu from '../../components/menu/CustomMenu';

import { getDataUser, register, edit } from '../../services/db_Firebase';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './RegisterEndEdit.css';

const RegisterEndEdit = () => {

  const [initialValues, setInitialValues] = useState({});
  const { mode } = useParams();
  const [title, setTitle] = useState('');
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);

  if (!title && mode === 'register') {
    setTitle("Realize seu cadastro");
  } else if (!title) {
    CheckLogged();
    setTitle("Altere seus dados");
  }

  useEffect(() => {
    if (isLoaded && (mode !== 'register')) {
      setTimeout(async () => {
        if (!Object.keys(initialValues).length) {
          const dataUser = await getDataUser();
          if (Object.keys(dataUser).length) {
            setInitialValues(dataUser);
            setIsLoaded(false);
          }
        }
      }, 200);
      setLoadingTime(loadingTime + 1);
    };
  }, [mode, initialValues, isLoaded, loadingTime, setLoadingTime]);

  const validateCepWithFormat = cep => {
    if (cep && cep.indexOf('-') !== -1) {
      return validateCep(cep);
    }

    if (cep && cep.length === 8) {
      let cepTemp = '';

      cep.split('').forEach((character, idx) => {
        if (idx === 5) {
          cepTemp += '-';
        };
        cepTemp += character;
      });
      return validateCep(cepTemp)
    }
  }

  const validationsRegister = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    email: yup.string().email('Email invalido').required('Campo obrigatório'),
    password: yup.string().min(6).required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório').test('cpf', 'CPF Inválido', (value) => validateCPF(value)),
    pis: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório').test('cep', 'CEP Inválido', (value) => validateCepWithFormat(value)),
    pais: yup.string().required('Campo obrigatório'),
    estado: yup.string().required('Campo obrigatório'),
    municipio: yup.string().required('Campo obrigatório'),
    rua: yup.string().required('Campo obrigatório'),
    numero: yup.string().required('Campo obrigatório'),
  });

  const validationsEdit = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    cpf: yup.string().required('Campo obrigatório').test('cpf', 'CPF Inválido', (value) => validateCPF(value)),
    pis: yup.string().required('Campo obrigatório'),
    cep: yup.string().required('Campo obrigatório').test('cep', 'CEP Inválido', (value) => validateCepWithFormat(value)),
    pais: yup.string().required('Campo obrigatório'),
    estado: yup.string().required('Campo obrigatório'),
    municipio: yup.string().required('Campo obrigatório'),
    rua: yup.string().required('Campo obrigatório'),
    numero: yup.string().required('Campo obrigatório'),
  });


  const handleSubmit = async values => {
    if (mode === 'register') {
      await register(values)
        .then(() => {
          toast.success('Conta criada com sucesso!, Faça login para continuar');
          setTimeout(() => {
            history.push('/login');
          }, 3000);
        });
    } else {
      await edit(values)
        .then(() => {
          toast.success('Alteração de dados realizada com sucesso :)');
        }).catch(() => {
          toast.error('Erro desconhecido, por favor tente novamente!');
        });
    }
  };

  return (
    <div className="container-register">
      <CustomMenu showConfig={mode !== 'register'} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={mode === 'register' ? validationsRegister : validationsEdit}
        enableReinitialize={true}>

        <Form className="register">
          <Grid container spacing={3}>
            <Grid item xs={12}><p className="title">{title}</p></Grid>
            <Grid item xs={12} sm={6}>
              <p className="category">Informações Pessoais</p>
              <Field name="name" label="Nome Completo" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="email" label="Seu melhor email" type="text" mode={mode} className="register-field" component={TextFieldCustom} />
              <Field name="password" label="Senha" type="password" mode={mode} className="register-field" component={TextFieldCustom} />
              <Field name="cpf" label="CPF" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="pis" label="PIS" type="text" className="register-field" component={TextFieldCustom} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <p className="category">Seu endereço</p>
              <Field name="cep" label="CEP" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="pais" label="País" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="estado" label="Estado" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="municipio" label="Município" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="rua" label="Rua" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="numero" label="Número" type="text" className="register-field" component={TextFieldCustom} />
              <Field name="complemento" label="Complemento" type="text" className="register-field" component={TextFieldCustom} />
            </Grid>
          </Grid>
          <Divider light className="divider" />
          <Grid container spacing={3}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <div className="register-btn-group">
                <p className={mode === 'register' ? null : 'hidden'}>Já possui uma conta? <Button onClick={() => history.push('/login')} color="primary" size="small">Fazer Login</Button></p>
                <Button type="submit" className="register-btn" size="large" variant="contained" fullWidth>
                  {mode === 'register' ? 'Realizar cadastro' : 'Realizar Alterações'}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default RegisterEndEdit;