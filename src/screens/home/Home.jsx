import React from 'react';
import CustomMenu from '../../components/menu/CustomMenu';

import CheckLogged from '../../CheckLogged';

import './Home.css';

const Home = () => {
  CheckLogged();

  const username = localStorage.getItem('username')

  return (
    <div className="container-home">
      <CustomMenu showConfig />
      <div className="welcome">
        <p className="greeting">Olá, {username}</p>
        <p className="complementary-greeting">Já bateu seu ponto hoje?</p>
      </div>
    </div>
  )
}

export default Home;