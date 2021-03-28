import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.TALENT.API_BASE_URL,
});

function getTalents(members) {
  const requests = [];
  for (const member of members) {
    requests.push(axiosInstance.get(`/members/${member.username}`));
    requests.push(axiosInstance.get(`/members/${member.username}/stats`));
    requests.push(axiosInstance.get(`/members/${member.username}/skills`));
  }
  return Promise.all(requests).then((results) => {
    const transformedResults = [];
    for (let i = 0; i < members.length; ++i) {
      const member = members[i];
      const memberData = results[i * 3].data;
      const statsData = results[i * 3 + 1].data;
      const skillsData = results[i * 3 + 2].data;
      transformedResults.push({
        member: {
          handle: memberData.handle,
          homeCountryCode: memberData.homeCountryCode,
          photoURL: memberData.photoURL,
          maxRating: {
            ratingColor: memberData.maxRating?.ratingColor,
          },
          createdAt: memberData.createdAt,
        },
        tags: member.tags,
        wins: statsData.wins,
        skills: Object.values(skillsData.skills || {}).map(skill => skill.tagName),
        experience: process.env.TALENT.DUMMY_EXPERIENCES,
      });
    }
    return transformedResults;
  });
}

export default {
  getTalents,
};
