import React from 'react';
import logo from 'assets/images/logo.svg';

import './styles.scss';

const Header = () => (
  <header styleName="header">
    <div styleName="content-center">
      <img src={logo} styleName="logo" alt="logo" />
      <h1 styleName="display-2">TAAS ROI CALCULATOR</h1>
    </div>
  </header>
);

export default Header;
