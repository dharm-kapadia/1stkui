import mockAgreementsData, { range } from 'utils/agreements-mock-data';

const newTradeAgreement = (index) => {
  const tempData = mockAgreementsData(index);

  return {
    ...tempData
  };
};

export default function makeTradeAgreementData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newTradeAgreement(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
