import { Chance } from 'chance';

const chance = new Chance();

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function mockEventsData(index) {
  return {
    type: `${chance.natural({ min: 1, max: 999999999 })}${index}`,
    source: chance.string(),
    subject: chance.string(),
    id: chance.natural({ min: 1, max: 999999999 }),
    time: chance.date(),
    relatedProcess: chance.string(),
    relatedSubProcess: chance.string(),
    relatedObjectId: chance.natural({ min: 1, max: 999999999 }),
    relatedObjectType: chance.string()
  };
}

export default mockEventsData;
