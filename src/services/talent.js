import axios from 'axios';
import _ from 'lodash';

const axiosInstance = axios.create({
  baseURL: process.env.TALENT.API_BASE_URL,
});

/**
 * Get talents of the members
 * @param {Array<{username: String, tags: Array<{label: String, color: String}>}>} members
 * @returns Promise that resolves to an array of talents of the members
 */
function getTalents(members) {
  const requests = [];
  members.forEach((member) => {
    requests.push(axiosInstance.get(`/members/${member.username}`));
    requests.push(axiosInstance.get(`/members/${member.username}/stats`));
    requests.push(axiosInstance.get(`/members/${member.username}/skills`));
  });
  return Promise.all(requests).then((results) => {
    const transformedResults = [];
    members.forEach((member, i) => {
      const memberData = results[i * 3].data;
      const statsData = results[i * 3 + 1].data[0];
      const skillsData = results[i * 3 + 2].data;
      transformedResults.push({
        member: _.pick(
          memberData,
          'handle',
          'homeCountryCode',
          'photoURL',
          'maxRating',
          'createdAt',
        ),
        tags: member.tags,
        wins: statsData?.wins,
        skills: Object.values(skillsData.skills || {}).map(
          (skill) => skill.tagName,
        ),
        experience: process.env.TALENT.DUMMY_EXPERIENCES,
      });
    });
    return transformedResults;
  });
}

export default {
  getTalents,
};
