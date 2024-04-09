export const flattenContracts = (input) => {
  // Iterate through the API call response and create flattened Contract objects
  var contracts = [];

  input.forEach((item) => {
    var contract = {};

    if (item !== null) {
      contract['contractId'] = item.contractId;
      contract['contractStatus'] = item.contractStatus;
      contract['createDateTime'] = item.createDateTime;
      contract['lastUpdateDateTime'] = item.lastUpdateDateTime;
      contract['matchingSpirePositionId'] = item.matchingSpirePositionId;
      contract['matchingSpireTradeId'] = item.matchingSpireTradeId;
      contract['processingStatus'] = item.processingStatus;
      contract['ticker'] = item.trade.instrument.ticker;
      contract['cusip'] = item.trade.instrument.cusip;
      contract['isin'] = item.trade.instrument.isin;
      contract['sedol'] = item.trade.instrument.sedol;
      contract['quick'] = item.trade.instrument.quick;
      contract['rebateRate'] = item.trade.rate.rebateRate;
      contract['quantity'] = item.trade.quantity;
      contract['billingCurrency'] = item.trade.billingCurrency;
      contract['dividendRatePct'] = item.trade.dividendRatePct;
      contract['tradeDate'] = item.trade.tradeDate;
      contract['termType'] = item.trade.termType;
      contract['termDate'] = item.trade.termDate;
      contract['settlementType'] = item.trade.settlementType;
      contract['settlementDate'] = item.trade.settlementDate;
      contract['contractPrice'] = item.trade.collateral.contractPrice;
      contract['contractValue'] = item.trade.collateral.contractValue;
      contract['collateralValue'] = item.trade.collateral.collateralValue;
      contract['collateralCurrency'] = item.trade.collateral.currency;
      contract['collateralType'] = item.trade.collateral.type;
      contract['collateralMargin'] = item.trade.collateral.margin;
      contract['roundingRule'] = item.trade.collateral.roundingRule;
      contract['roundingMode'] = item.trade.collateral.roundingMode;
      contract['venueRefId'] = item.trade.venues[0].venueRefKey;
      contract['internalPartyId'] = item.trade.transactingParties[0].party.partyId;
      contract['internalRefId'] = item.trade.transactingParties[0].internalRef.internalRefId;
      contract['accountId'] = item.trade.transactingParties[0].internalRef.accountId;
      contract['tradeDate'] = item.trade.tradeDate;
      contract['settlementDate'] = item.trade.settlementDate;

      contracts.push(contract);
    }
  });

  return contracts;
};

// Iterate through the API call response and search for only UNMATCHED events
export const filterForUnmatched = (input) => {
  var pending = [];

  input.forEach((item) => {
    if (item.type.includes('UNMATCHED')) {
      var unmatched = {};

      unmatched['id'] = item.id;
      unmatched['time'] = item.time;
      unmatched['type'] = item.type;
      unmatched['source'] = item.source;
      unmatched['subject'] = item.subject;
      unmatched['relatedprocess'] = item.relatedprocess;
      unmatched['message'] = item.data.message;

      pending.push(unmatched);
    }
  });

  return pending;
};

// Iterate through the API call response and search for only TECHNICAL events
export const filterForTechnical = (input) => {
  var technical = [];

  input.forEach((item) => {
    if (item.type.includes('TECHNICAL')) {
      var obj = {};

      obj['id'] = item.id;
      obj['time'] = item.time;
      obj['type'] = item.type;
      obj['source'] = item.source;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;
      obj['message'] = item.data.message;

      technical.push(obj);
    }
  });

  return technical;
};

// Iterate through the API call response and search for only declined events
export const filterForDeclined = (input) => {
  var declined = [];

  input.forEach((item) => {
    if (item.data.message.includes('declined')) {
      declined.push(item);
    }
  });

  return declined;
};
