import axios from 'axios';

// Iterate through the API call response and search for only recall events
export const filterForRecalls = (input) => {
  var recalls = [];

  input.forEach((item) => {
    if (item.type.includes('RECALL')) {
      var obj = {};

      obj['id'] = item.recallId;
      obj['loanId'] = item.loanId;
      obj['status'] = item.status;
      obj['executionVenue'] = item.executionVenue;
      obj['openQuantity'] = item.openQuantity;
      obj['quantity'] = item.quantity;
      obj['recallDate'] = item.recallDate;
      obj['recallDueDate'] = item.recallDueDate;
      obj['lastUpdateDatetime'] = item.lastUpdateDatetime.replace('T', ' ').substring(0, 19);

      recalls.push(obj);
    }
  });

  return recalls;
};

export const getRecalls = async () => {
  const url = localStorage.getItem('url') + '/cloudevents';
  const token = localStorage.getItem('token');

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

    return filterForRecalls(respData);
  }
};
