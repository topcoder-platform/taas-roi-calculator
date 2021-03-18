import React from 'react';
import PT from 'prop-types';
import IconHR from 'assets/icons/hr.svg';
import * as rateUtil from '../../utils/rate';
import * as constants from '../../constants';
import IconLocation from '../../assets/icons/location.svg';
import IconWin from '../../assets/icons/win.svg';
import IconPhotoDefault from '../../assets/images/user.svg';

import './styles.scss';

const CardMember = ({
  member, tags, wins, skills, experience,
}) => (
  <div styleName="card">
    <div styleName="card-header member">
      <span styleName="rate">{rateUtil.createRateIcon(member.maxRating.ratingColor)}</span>
      <div styleName="photo">
        <img src={member.photoURL || IconPhotoDefault} alt="member" />
      </div>
      <span styleName="handle">{member.handle}</span>
      <div styleName="tags">
        {tags.map((tag) => <span styleName="tag" style={{ background: constants.TAG_COLOR[tag] }} key={tag}>{tag}</span>)}
      </div>
      <div>
        <span styleName="country">
          <IconLocation styleName="icon" />
          {' '}
          {member.homeCountryCode}
        </span>
        <span styleName="win">
          <IconWin styleName="icon" />
          {' '}
          {wins}
          {' '}
          WINS
        </span>
      </div>
      <span styleName="since">
        MEMBER SINCE&nbsp;
        <span>{member.createdAt}</span>
      </span>
    </div>
    <div styleName="card-body member">
      <h4 styleName="heading-4">SKILLS</h4>
      <ul styleName="skills">
        {
          skills.map((skill) => <li key={skill}>{skill}</li>)
        }
      </ul>

      <IconHR styleName="hr" />

      <h4 styleName="heading-4">EXPERIENCE</h4>
      <ul styleName="experience">
        {
          experience.map((exp) => <li key={exp}>{exp}</li>)
        }
      </ul>
    </div>
  </div>
);

CardMember.defaultProps = {
  tags: [],
  wins: null,
  skills: [],
  experience: [],
};

CardMember.propTypes = {
  member: PT.shape({
    handle: PT.string,
    homeCountryCode: PT.string,
    photoURL: PT.string,
    maxRating: PT.shape({ ratingColor: PT.string }),
    createdAt: PT.oneOfType([PT.string, PT.number]),
  }).isRequired,
  tags: PT.arrayOf(PT.string),
  wins: PT.number,
  skills: PT.arrayOf(PT.string),
  experience: PT.arrayOf(PT.string),
};

export default CardMember;
