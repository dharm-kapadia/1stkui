import axios from 'axios';

export const filterForBuyins = (input) => {
  var buyins = [];

  input.forEach((item) => {
    if (item.type.includes('BUYIN')) {
      var obj = {};

      obj['id'] = item.buyinInitiatedId;
      obj['buyinDate'] = item.buyinDate;
      obj['loanId'] = item.loanId;
      obj['status'] = item.status;
      obj['openQuantity'] = item.openQuantity;
      obj['quantity'] = item.quantity;
      obj['buyinInitiatedLastUpdateDatetime'] = item.buyinInitiatedLastUpdateDatetime.replace('T', ' ').substring(0, 19);
      obj['buyinCompleteId'] = item.buyinCompleteId;

      obj['type'] = item.type;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;
      obj['message'] = item.data.message;
      obj['value'] = item.data.value;
      obj['currency'] = item.data.currency;
      obj['unit'] = item.data.unit;
      obj['valueDate'] =
        item.data.valueDate =
        obj['buyinCompletedLastUpdateDatetime'] =
          item.buyinCompletedLastUpdateDatetime.replace('T', ' ').substring(0, 19);

      buyins.push(obj);
    }
  });

  return buyins;
};

export const getBuyIns = async () => {
  const token = localStorage.getItem('token');
  const url = localStorage.getItem('url') + '/cloudevents';

  let respData = [];

  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (result.data.totalItems !== 0) {
    respData = result.data.items;

    if (result.data.totalPages > 1) {
      // Make multiple calls to get full dataset
      for (let i = 1; i < result.data.totalPages; i++) {
        const nextPage = await axios.get(url + `?page=${i}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        respData.push(...nextPage.data.items);
      }
    }

    return filterForBuyins(respData);
  }
};
