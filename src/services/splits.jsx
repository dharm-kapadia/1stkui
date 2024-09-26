import axios from 'axios';

// Iterate through the API call response and search for only loan split events
export const filterForSplits = (input) => {
  var splits = [];

  input.forEach((item) => {
    if (item.type.includes('SPLIT')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.splitId;
      obj['status'] = item.status;
      obj['splitLots'] = item.splitLots;
      obj['lastUpdateDateTime'] = dt.replace('T', ' ').substring(0, 19);

      splits.push(obj);
    }
  });

  return splits;
};

export const getSplits = async () => {
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

    return filterForSplits(respData);
  }
};
