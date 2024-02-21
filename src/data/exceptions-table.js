import mockExceptionsData, { range } from 'utils/exceptions-mock-data';

const newException = (index) => {
  const tempData = mockExceptionsData(index);

  return {
    ...tempData
  };
};

export default function makeExceptionsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newException(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
