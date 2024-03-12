import { Chance } from 'chance';

const chance = new Chance();

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function mockDeclinedData(index) {
  return {
    source: `${chance.string()}${index}`,
    subject: chance.string(),
    id: chance.natural({ min: 1, max: 999999999 }),
    time: chance.date(),
    relatedProcess: chance.string(),
    relatedSubProcess: chance.string(),
    relatedObjectId: chance.natural({ min: 1, max: 999999999 }),
    relatedObjectType: chance.string()
  };
}

const newDeclined = (index) => {
  const tempData = mockDeclinedData(index);

  return {
    ...tempData
  };
};

export default function makeDeclinedData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newDeclined(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
