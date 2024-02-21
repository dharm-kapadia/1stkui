import mockEventsData, { range } from 'utils/events-mock-data';

const newEvent = (index) => {
  const tempData = mockEventsData(index);

  return {
    ...tempData
  };
};

export default function makeEventsData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newEvent(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
