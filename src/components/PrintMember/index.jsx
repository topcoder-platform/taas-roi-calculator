import React from 'react';
import PT from 'prop-types';
import Clampy from '@clampy-js/react-clampy';
import IconHR from 'assets/icons/hr.svg';
import * as rateUtil from '../../utils/rate';
import IconLocation from '../../assets/icons/location.svg';
import IconWin from '../../assets/icons/win.svg';
import IconPhotoDefault from '../../assets/images/user.svg';

import './styles.scss';

const PrintMember = ({
                         member, tags, wins, skills, experience
                     }) => (
    <div styleName='card'>
        <div styleName='card-header member'>
            <div>
                <span styleName='rate'>{rateUtil.createRateIcon(member.maxRating.ratingColor, '20px')}</span>
                <div styleName='photo'>
                    <img src={member.photoURL || IconPhotoDefault} alt='member' />
                </div>
            </div>
            <div>
                <span styleName='handle'>{member.handle}</span>
                <div styleName='tags'>
                    {tags.map((tag) => <span styleName='tag' style={{ background: tag.color }} key={tag.label}>{tag.label}</span>)}
                </div>
                <span styleName='since'>
                MEMBER SINCE&nbsp;
                    <span>{new Date(member.createdAt).getFullYear()}</span>
            </span>

                <span styleName='country'>
          <IconLocation styleName='icon' />
                    {' '}
                    {member.homeCountryCode}
        </span>
                <span styleName='win'>
          <IconWin styleName='icon' />
                    {' '}
                    {wins}
                    {' '}
                    WINS
        </span>
            </div>

        </div>
        {/* <div styleName='card-body member'>
            <h4 styleName='heading-4'>SKILLS</h4>
            <div styleName='skills'>
                <Clampy clampSize='2'>
                    {
                        skills.join(', ')
                    }
                </Clampy>
            </div>
        </div>*/}
    </div>
);

PrintMember.defaultProps = {
    tags: [],
    wins: null,
    skills: [],
    experience: []
};

PrintMember.propTypes = {
    member: PT.shape({
        handle: PT.string,
        homeCountryCode: PT.string,
        photoURL: PT.string,
        maxRating: PT.shape({ ratingColor: PT.string }),
        createdAt: PT.oneOfType([PT.string, PT.number])
    }).isRequired,
    tags: PT.arrayOf(PT.shape({ label: PT.string, color: PT.string })),
    wins: PT.number,
    skills: PT.arrayOf(PT.string),
    experience: PT.arrayOf(PT.string)
};

export default PrintMember;
