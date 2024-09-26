import { Chance } from 'chance';

const chance = new Chance();

export const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function MockTradeAgreementData(index) {
  return {
    loanId: `${chance.natural({ min: 1, max: 999999999 })}${index}`,
    processingStatus: chance.string(),
    matchingSpirePositionId: chance.natural({ min: 1, max: 999999999 }),
    loanStatus: chance.string(),
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

const newTradeAgreement = (index) => {
  const tempData = MockTradeAgreementData(index);

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
