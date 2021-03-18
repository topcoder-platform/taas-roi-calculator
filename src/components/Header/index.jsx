import React from 'react';
import Sticky from 'react-stickynode';
import logo from 'assets/images/logo.svg';

import './styles.scss';

const Header = () => (
  <Sticky top={0} innerZ={9999}>
    <header styleName="header">
      <div styleName="content-center">
        <img src={logo} styleName="logo" alt="logo" />
        <h1 styleName="display-2">TAAS ROI CALCULATOR</h1>
      </div>
    </header>
  </Sticky>
);

export default Header;
