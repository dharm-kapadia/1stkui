export const flattenContracts = (input) => {
  // Iterate through the API call response and create flattened Contract objects
  var contracts = [];

  input.forEach((item) => {
    var contract = {};

    if (item !== null) {
      contract['id'] = item.contractId;
      contract['contractStatus'] = item.contractStatus;
      contract['createDateTime'] = item.createDateTime.replace('T', ' ').substring(0, 19);
      contract['lastUpdateDateTime'] = item.lastUpdateDateTime.replace('T', ' ').substring(0, 19);
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
      var dt = item.time;

      unmatched['id'] = item.id;
      unmatched['time'] = dt.replace('T', ' ').substring(0, 19);
      unmatched['type'] = item.type;
      unmatched['subject'] = item.subject;
      unmatched['relatedprocess'] = item.relatedprocess;

      if (item.data.relatedObjects.length > 0) {
        item.data.relatedObjects.forEach((ro) => {
          if (ro.relatedObjectType === '1SrceLoanContract') {
            unmatched['relatedProcessId'] = ro.relatedObjectId;
          }
        });
      }

      unmatched['message'] = item.data.message;

      pending.push(unmatched);
    }
  });

  return pending;
};

// Iterate through the API call response and search for only for DISCREPANCIES events
export const filterForDiscrepancies = (input) => {
  var technical = [];

  input.forEach((item) => {
    if (item.type.includes('DISCREPANCIES')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.id;
      obj['time'] = dt.replace('T', ' ').substring(0, 19);
      obj['type'] = item.type;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;

      if (item.data.relatedObjects.length > 0) {
        item.data.relatedObjects.forEach((ro) => {
          if (ro.relatedObjectType === '1SrceLoanContract') {
            obj['relatedProcessId'] = ro.relatedObjectId;
          }
        });
      }

      obj['message'] = item.data.message;

      if (item.data.fieldsImpacted.length > 0) {
        var str = '';

        item.data.fieldsImpacted.forEach((fields) => {
          str += '[' + fields.fieldExceptionType + ', ' + fields.fieldName + ', ' + fields.fieldValue + '], ';
        });

        obj['fields'] = str;
      }

      technical.push(obj);
    }
  });

  return technical;
};

// Iterate through the API call response and search for only TECHNICAL events
export const filterForTechnical = (input) => {
  var technical = [];

  input.forEach((item) => {
    if (item.type.includes('TECHNICAL')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.id;
      obj['time'] = dt.replace('T', ' ').substring(0, 19);
      obj['type'] = item.type;
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
    if (item.type.includes('DECLINED')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.id;
      obj['time'] = dt.replace('T', ' ').substring(0, 19);
      obj['type'] = item.type;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;
      obj['message'] = item.data.message;

      declined.push(obj);
    }
  });

  return declined;
};

export const flattenEvents = (input) => {
  var events = [];

  input.forEach((item) => {
    var obj = {};
    var dt = item.time;

    obj['id'] = item.id;
    obj['time'] = dt.replace('T', ' ').substring(0, 19);
    obj['type'] = item.type;
    obj['subject'] = item.subject;
    obj['relatedprocess'] = item.relatedprocess;
    obj['message'] = item.data.message;

    events.push(obj);
  });

  return events;
};
