import axios from 'axios';

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

/**
 * Retrieve Decline instructions information based on
 * various query parameters. Supports filtering by each
 * field separately or in combination, date range queries,
 * sorting, and pagination.
 *
 * @param {string} token Bearer token for API authentication
 * @param {string} declineInstructionId
 * @param {string} relatedExceptionEventId
 * @param {string} relatedProposalId
 * @param {string} sinceCreationDate    Decline instruction creation date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} beforeCreationDate   Decline instruction creation date (before), excluded, in the format 'yyyy-MM-dd'
 * @param {string} userId
 * @param {string} sort   Sort by specified fields (e.g., 'userId')
 * @param {integer} page  Defaults to 0
 * @param {integer} limit Defaults to 20
 *
 * @return {Array} The array of decline instructions
 */
export const getDeclineInstructions = async (token) => {
  const url = localStorage.getItem('url') + '/decline-instructions';

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const resp = await fetch(url, {
    method: 'GET',
    headers
  });

  if (resp.ok && resp.status === 200) {
    return resp.json();
  }
};

/**
 * Create a Decline instruction
 *
 * @param {string} token
 * @param {DeclinedInstruction} instrs
 */
export const postDeclineInstructions = async (token, instrs) => {
  const url = localStorage.getItem('url') + '/decline-instructions';
  const declinedInstruction = JSON.stringify(instrs);

  await axios
    .post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      declinedInstruction
    })
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
};

export const getDeclined = async () => {
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

    return filterForDeclined(respData);
  }
};
