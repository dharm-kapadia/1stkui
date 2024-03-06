import { range } from 'utils/returns-mock-data';

const newBuyin = (index) => {
  const tempData = mockBuyinsData(index);

  return {
    ...tempData
  };
};

export default function makeBuyinsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newBuyin(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
