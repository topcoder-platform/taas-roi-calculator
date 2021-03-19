/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PT from 'prop-types';
import { GhostButton } from 'topcoder-react-ui-kit';
import IconFacebook from '../../assets/icons/facebook.svg';
import IconLinkedin from '../../assets/icons/linkedin.svg';
import IconTwitter from '../../assets/icons/twitter.svg';

import './styles.scss';

const SocialShareButton = ({ url }) => {
  const msg = 'I used the Topcoder Talent ROI Calculator to see how much I can save on hiring freelancers. See how much you can save.';
  const params = 'menubar=no,toolbar=no,status=no,width=570,height=570,top=,left=';

  const openFB = () => {
    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(msg)}`;
    window.open(shareUrl, 'NewWindow', params);
  };

  const openLI = () => {
    const shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, 'NewWindow', params);
  };

  const openTW = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(msg)}`;
    window.open(shareUrl, 'NewWindow', params);
  };

  return (
    <div styleName="social-share-buttons">
      <span styleName="label">SHARE</span>
      <ul styleName="buttons">
        <li><GhostButton onClick={openFB}><IconFacebook /></GhostButton></li>
        <li><GhostButton onClick={openLI}><IconLinkedin /></GhostButton></li>
        <li><GhostButton onClick={openTW}><IconTwitter /></GhostButton></li>
      </ul>
    </div>
  );
};

SocialShareButton.propTypes = {
  url: PT.string.isRequired,
};

export default SocialShareButton;
