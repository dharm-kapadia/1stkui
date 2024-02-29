import axios from 'axios';

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
const getDeclineInstructions = (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/decline-instructions';

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(function (response) {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
    });
};

/**
 * Create a Decline instruction
 *
 * @param {string} token
 * @param {DeclinedInstruction} instrs
 */
const postDeclineInstructions = (token, instrs) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/decline-instructions';
  const declinedInstruction = JSON.stringify(instrs);

  axios
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

export { getDeclineInstructions, postDeclineInstructions };
