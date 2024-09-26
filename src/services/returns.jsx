import axios from 'axios';

// Iterate through the API call response and search for only return events
export const filterForReturns = (input) => {
  var returns = [];

  input.forEach((item) => {
    if (item.type.includes('RETURN')) {
      var obj = {};

      obj['id'] = item.returnId;
      obj['loanId'] = item.loanId;
      obj['quantity'] = item.quantity;
      obj['returnDate'] = item.returnDate;
      obj['status'] = item.status;
      obj['partyId'] = item.partyId;
      obj['returnType'] = item.returnType;
      obj['venueName'] = item.venueName;
      obj['venueRefKey'] = item.venueRefKey;
      obj['transactionDatetime'] = item.transactionDatetime.replace('T', ' ').substring(0, 19);
      obj['partyRole'] = item.partyRole;
      obj['venueRefPartyKey'] = item.venueRefPartyKey;
      obj['localVenueFieldName'] = item.localVenueFieldName;
      obj['localVenueFieldValue'] = item.localVenueFieldValue;
      obj['lastUpdateDatetime'] = item.lastUpdateDatetime.replace('T', ' ').substring(0, 19);

      returns.push(obj);
    }
  });

  return returns;
};

export const getReturns = async () => {
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

    return filterForReturns(respData);
  }
};
