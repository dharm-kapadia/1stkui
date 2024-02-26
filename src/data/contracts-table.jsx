import mockContractData, { range } from 'utils/contracts-mock-data';

const newContract = (index) => {
  const tempData = mockContractData(index);

  return {
    ...tempData
  };
};

export default function makeContractData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => ({
      ...newContract(index + 1),
      subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
    }));
  };

  return makeDataLevel();
}
