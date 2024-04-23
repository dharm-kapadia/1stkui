import axios from 'axios';

// Iterate through the API call response and search for only for DISCREPANCIES events
const filterForDiscrepancies = (input) => {
  var discrepancies = [];

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

      discrepancies.push(obj);
    }
  });

  return discrepancies;
};

const getDiscrepancies = async () => {
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

      return filterForDiscrepancies(respData);
    }
  }
};

export { filterForDiscrepancies, getDiscrepancies };
