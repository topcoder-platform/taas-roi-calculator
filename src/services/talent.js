import talentsData from '../assets/data/talents.json';

function getTalents() {
  return Promise.resolve(talentsData);
}

export default {
  getTalents,
};
