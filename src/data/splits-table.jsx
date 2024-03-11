import { range } from 'utils/splits-mock-data';

const newSplit = (index) => {
  const tempData = mockSplitsData(index);

  return {
    ...tempData
  };
};

export default function makeSplitsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newSplit(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
