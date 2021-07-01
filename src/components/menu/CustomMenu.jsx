import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';

import { login, logout, deleteAccount } from '../../services/db_Firebase';

import { TextField } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CustomMenu.css';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#9503cf',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomMenu({ showConfig }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeModal, setActiveModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderButtonConfig = (show) => {
    if (show) {
      return (
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="outlined"
          color="primary"
          className="btn-menu-config"
          onClick={handleClick}
        >
          Configurações
        </Button>
      );
    }
    return null;
  };

  const handleChange = values => {
    if (values.email) {
      setEmail(values.email.target.value);
    }
    if (values.password) {
      setPassword(values.password.target.value);
    }
  };

  const deleteAccountUser = () => {
    setActiveModal(true);
    handleClose();
  };

  const deleteAccountUserNow = async () => {

    if (!email) {
      toast.warn('Por favor, insira o seu email');
      return;
    }

    if (!password) {
      toast.warn('Por favor, insira a sua senha');
      return;
    }

    await login(email, password)
      .then(result => {
        if (result) {
          deleteAccount();
          toast.success('Conta deletada com sucesso! ');
        } else {
          toast.error('Email ou senha incorretos, tente novamente!');
        }
      });
  };

  const cancelDeletion = () => {
    setActiveModal(false);
  }

  return (
    <>
      <ToastContainer />
      <div className="menu">
        <div className={activeModal ? 'modal' : 'modal hidden'}>
          <p>Faça login para deletar a sua conta</p>
          <form>
            <TextField label={'Email'} name="email" margin="dense" variant="outlined" fullWidth onChange={value => handleChange({ 'email': value })} required />
            <TextField label={'Senha'} name="password" margin="dense" variant="outlined" fullWidth onChange={value => handleChange({ 'password': value })} type="password" required />
            <Button variant="contained" color="secondary" onClick={() => deleteAccountUserNow()} fullWidth size="large" startIcon={<DeleteIcon />}>
              Deletar minha conta
            </Button>
            <Button variant="outlined" onClick={() => cancelDeletion()} size="large" fullWidth>cancelar</Button>
          </form>
        </div>
        <img src="https://cdn.pontotel.com.br/wp-content/uploads/2020/05/gen_logo_26fffaab80f60db1b12ef1e67fd0f0c7.png" className="logo-menu" alt="Logo Pontotel" />
        {renderButtonConfig(showConfig)}
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div className="list-buttons">
            <button onClick={() => history.push('/')} className="btn-menu-list">
              <StyledMenuItem>
                <ListItemIcon>
                  <HomeIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </StyledMenuItem>
            </button>
            <button onClick={() => history.push('registerEndEdit/edit')} className="btn-menu-list">
              <StyledMenuItem>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Editar Cadastro" />
              </StyledMenuItem>
            </button>
            <button onClick={() => logout()} className="btn-menu-list">
              <StyledMenuItem>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Encerrar Sessão" />
              </StyledMenuItem>
            </button>
            <button onClick={() => deleteAccountUser()} className="btn-menu-list">
              <StyledMenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Deletar Minha Conta" />
              </StyledMenuItem>
            </button>
          </div>
        </StyledMenu>
      </div>
    </>
  );
}