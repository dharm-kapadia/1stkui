import mockReratesData, { range } from 'utils/rerates-mock-data';

const newRerate = (index) => {
  const tempData = mockReratesData(index);

  return {
    ...tempData
  };
};

export default function makeReratesData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newRerate(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
