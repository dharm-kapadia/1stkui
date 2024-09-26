import axios from 'axios';

// Iterate through the API call response and search for only negative acks
export const filterForNacks = (input) => {
  var nacks = [];

  input.forEach((item) => {
    if (item.type.includes('ACKNOWLEDGED')) {
      var obj = {};
      var dt = item.time;

      obj['id'] = item.id;
      obj['time'] = dt.replace('T', ' ').substring(0, 19);
      obj['type'] = item.type;
      obj['subject'] = item.subject;
      obj['relatedprocess'] = item.relatedprocess;
      obj['message'] = item.data.message;

      nacks.push(obj);
    }
  });

  return nacks;
};

/**
 * Retrieve Negative Acknowledgements information based on
 * various query parameters. Supports filtering by each
 * field separately or in combination, date range queries,
 * sorting, and pagination.
 *
 * @param {string} token Bearer token for API authentication
 * @param {string} declineInstructionId
 * @param {string} relatedExceptionEventId
 * @param {string} relatedProposalId
 * @param {string} creationDateTime    Decline instruction creation date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} declineReasonCode
 * @param {string} declineReasonText
 * @param {integer} page  Defaults to 0
 * @param {integer} limit Defaults to 20
 *
 * @return {Array} The array of nacks
 */
export const getNacks = async (token) => {
  const url = localStorage.getItem('url') + '/nack-instructions';

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
 * Create a Nack instruction
 *
 * @param {string} token
 * @param {NackInstruction} instrs
 */
export const postNackInstructions = async (token, instrs) => {
  const url = localStorage.getItem('url') + '/nack-instructions';
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
