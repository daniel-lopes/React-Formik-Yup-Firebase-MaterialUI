import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Button from '@material-ui/core/Button'

import * as yup from 'yup';

import { login } from '../../services/db_Firebase';

import TextFieldCustom from '../../components/TextFieldCustom';

import "./Login.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const history = useHistory();

  const handleSubmit = async values => {
    await login(values.email, values.password)
      .then(result => {
        if (result) {
          history.push('/');
        } else {
          toast.error('Usuário ou senha inválidos, tente novamente!');
        }
      });
  }

  const validations = yup.object().shape({
    email: yup.string().email('Email invalido').required('Campo obrigatório'),
    password: yup.string().min(6).required('Campo obrigatório')
  });

  return (
    <div className="container">
      <div className="login">
        <img src="https://cdn.pontotel.com.br/wp-content/uploads/2020/05/gen_logo_26fffaab80f60db1b12ef1e67fd0f0c7.png" className="logo" alt="Logo Pontotel" />
        <p>Bem-vindo ao nosso sistema</p>
        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
          <Form>
            <div className="login-group">
              <Field name="email" label="Email" type="text" className="login-field" component={TextFieldCustom} />
              <Field name="password" label="Senha" type="password" className="login-field" component={TextFieldCustom} />
            </div>
            <Button className="login-btn" size="large" variant="contained" type="submit" fullWidth>Entrar</Button>
            <p>Ainda não possui uma conta? <Button onClick={() => history.push('/RegisterEndEdit/register')} color="primary" size="small">Criar agora</Button></p>
          </Form>
        </Formik>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login;