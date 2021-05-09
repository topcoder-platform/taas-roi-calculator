import React from 'react';
import PT from 'prop-types';
import Clampy from '@clampy-js/react-clampy';
import * as rateUtil from '../../utils/rate';
import IconLocation from '../../assets/icons/location.svg';
import IconWin from '../../assets/icons/win.svg';
import IconPhotoDefault from '../../assets/images/user.svg';

import './styles.scss';

const membersPics = [
    '/src/assets/images/birdofpreyru.png',
    '/src/assets/images/onsky.png',
    '/src/assets/images/hi4sandy.png',
    '/src/assets/images/NightWolf.png',
    '/src/assets/images/Sky_.jpeg',
    '/src/assets/images/codejam.png',
    '/src/assets/images/iamtong.png',
    '/src/assets/images/kmurti.png',
    '/src/assets/images/nqv2018.png',
    '/src/assets/images/Petr.png',
    '/src/assets/images/suneetk92.png',
    '/src/assets/images/ToxicPixel.png',
    '/src/assets/images/universo.png',
    '/src/assets/images/yoki.png'
];


const PrintMember = ({
                         member, tags, wins, skills, formType
                     }) => {
    let imageLink;
    if(member.photoURL) {
        membersPics.map(pic => {
            if(pic.includes(member.handle)) {
                imageLink = pic;
            }
        })
    }

    return (
        <div styleName='card'>
            <div styleName='card-header member'>
                <div styleName='member-photo'>
                    <span styleName='rate'>{rateUtil.createRateIcon(member.maxRating.ratingColor, '20px')}</span>
                    <div styleName='photo'>
                        <img src={imageLink || IconPhotoDefault} alt='member' />
                    </div>
                </div>
                <div styleName='member-info'>
                    <div styleName='handle'>{member.handle}</div>
                    <div styleName='tags'>
                        {tags.map((tag) => {
                                if (tag.label === formType) {
                                    return <span styleName='tag' style={{ background: tag.color }} key={tag.label}>{tag.label}</span>;
                                }
                            }
                        )}
                    </div>
                    <div styleName='stats'>
                        <div styleName='since'>
                            MEMBER SINCE&nbsp;
                            <span>{new Date(member.createdAt).getFullYear()}</span>
                        </div>
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
            </div>
            <div styleName='member-skills'>
                <h4 styleName='heading-4'>SKILLS</h4>
                <div styleName='skills'>
                    <Clampy clampSize='3'>
                        {
                            skills.join(', ')
                        }
                    </Clampy>
                </div>
            </div>
        </div>
    );
};


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
