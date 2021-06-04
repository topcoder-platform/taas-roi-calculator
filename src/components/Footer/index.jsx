/* eslint-disable max-len */
import React from 'react';
import './styles.scss';

const Footer = () => (
  <footer styleName="footer">
    <p styleName="content-center">
      By clicking “See your results” you agree to our Terms and Privacy Policy. We are never going to sell your data or send you spam. Your information is being used for communication purposes only. Wage and salary data:
      {' '}
      <a href="https://www.glassdoor.com/">glassdoor.com</a>
      . Bonus, equity, other benefits & employee overhead data: MIT study
      {' '}
      <a href="https://web.mit.edu/e-club/hadzima/pdf/how-much-does-an-employee-cost.pdf">How Much Does An Employee Cost?</a>
      . Recruiting & time to hire data: workable.com
      {' '}
      <a href="https://resources.workable.com/tutorial/faq-recruitment-budget-metrics">Recruiting Costs: Budget and Cost per Hire | Recruiting Metrics FAQ</a>
    </p>
  </footer>
);

export default Footer;
