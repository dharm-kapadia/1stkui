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

export const mapRerates = (items) => {
  var rerates = [];

  items.forEach((item) => {
    var obj = {};

    obj['id'] = item.rerateId;
    obj['contractId'] = item.contractId;
    obj['rerateStatus'] = item.rerateStatus;
    obj['processingStatus'] = item.processingStatus;
    obj['matchingSpireTradeId'] = item.matchingSpireTradeId;
    obj['originalBaseRate'] = item.rate.rebate.fixed.baseRate;
    obj['originalEffectiveRate'] = item.rate.rebate.fixed.effectiveRate;
    obj['proposedBaseRate'] = item.rerate.rebate.fixed.baseRate;
    obj['proposedEffectiveRate'] = item.rerate.rebate.fixed.effectiveRate;
    obj['createDatetime'] = item.createDatetime.replace('T', ' ').substring(0, 19);
    obj['lastUpdateDatetime'] = item.lastUpdateDatetime.replace('T', ' ').substring(0, 19);
    obj['effectiveDate'] = item.effectiveDate.replace('T', ' ').substring(0, 19);

    rerates.push(obj);
  });

  return rerates;
};
