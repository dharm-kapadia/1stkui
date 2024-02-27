import mockReturnsData, { range } from 'utils/returns-mock-data';

const newReturn = (index) => {
  const tempData = mockReturnsData(index);

  return {
    ...tempData
  };
};

export default function makeReturnsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newReturn(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
