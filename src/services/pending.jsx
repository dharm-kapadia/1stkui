import axios from 'axios';

// Iterate through the API call response and search for only UNMATCHED events
const filterForUnmatched = (input) => {
  var pending = [];

  input.forEach((item) => {
    if (item.type.includes('UNMATCHED') || item.type.includes('PENDING')) {
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

const getPending = async () => {
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

      return filterForUnmatched(respData);
    }
  }
};
export { filterForUnmatched, getPending };
