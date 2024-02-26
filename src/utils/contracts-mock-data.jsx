import { Chance } from 'chance';

const chance = new Chance();

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function mockContractData(index) {
  return {
    contractId: `${chance.natural({ min: 1, max: 999999999 })}${index}`,
    processingStatus: chance.string(),
    matchingSpirePositionId: chance.natural({ min: 1, max: 999999999 }),
    contractStatus: chance.string(),
    lastUpdateParty: chance.string(),
    lastUpdateDateTime: chance.date,
    venueRefKey: chance.string(),
    cusip: chance.string(),
    isin: chance.string(),
    sedol: chance.string(),
    ticker: chance.string(),
    tradeDate: chance.date(),
    settlementDate: chance.date(),
    collateralType: chance.string(),
    ccurrency: chance.string(),
    internalPartyId: chance.string(),
    accountId: chance.string(),
    internalRefId: chance.string()
  };
}

export default mockContractData;
