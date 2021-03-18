import React from 'react';
import PT from 'prop-types';
import './styles.scss';

const Card = ({ children }) => (
  <div styleName="card">
    {children}
  </div>
);

Card.defaultProps = {
  children: null,
};

Card.propTypes = {
  children: PT.node,
};

const Header = ({ children }) => (
  <div styleName="card-header">
    {children}
  </div>
);

Header.defaultProps = {
  children: null,
};

Header.propTypes = {
  children: PT.node,
};

const Body = ({ children }) => (
  <div styleName="card-body">
    {children}
  </div>
);

Body.defaultProps = {
  children: null,
};

Body.propTypes = {
  children: PT.node,
};

const Footer = ({ children }) => (
  <div styleName="card-footer">
    {children}
  </div>
);

Footer.defaultProps = {
  children: null,
};

Footer.propTypes = {
  children: PT.node,
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
