import mockRecallsData, { range } from 'utils/recalls-mock-data';

const newRecall = (index) => {
  const tempData = mockRecallsData(index);

  return {
    ...tempData
  };
};

export default function makeRecallsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newRecall(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
