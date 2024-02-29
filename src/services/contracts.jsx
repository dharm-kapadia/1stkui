import axios from 'axios';

/**
 * Retrieve 1Source Loan Contract information based on
 * various query parameters. Supports filtering by each
 * field separately or in combination, date range queries,
 * sorting, and pagination.
 *
 * @param {string} token    Bearer token for API authentication
 * @param {string} contractId
 * @param {string} processingStatus
 * @param {integer} matchingSpirePositionId
 * @param {string} contractStatus
 * @param {string} sinceLastUpdateDate    Contract last update date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} beforeLastUpdateDate   Contract last update date (before), excluded, in the format 'yyyy-MM-dd'
 * @param {string} venueRefKey
 * @param {string} cusip
 * @param {string} isin
 * @param {string} sedol
 * @param {string} ticker
 * @param {string} sinceTradeDate       Trade date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} beforeTradeDate      Trade date (before), excluded, in the format 'yyyy-MM-dd'
 * @param {string} sinceSettlementDate  Settlement date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} beforeSettlementDate Settlement date (before), excluded, in the format 'yyyy-MM-dd'
 * @param {string} collateralType
 * @param {string} currency
 * @param {string} internalPartyId
 * @param {string} accountId
 * @param {string} internalRefId
 * @param {string} sort     Sort by specified fields (e.g., 'contractId')
 * @param {integer} page    Defaults to 0
 * @param {integer} limit   Defaults to 20
 *
 * @return {Array} The array of contracts
 */
const getContracts = (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';

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
 * Retrieve a specific 1Source Loan Contract by ID
 *
 * @param {string} token    Bearer token for API authentication
 * @param {integer} id      Loan contract id
 *
 * @return {Array}  Loan contract
 */

const getContractById = (token, id) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts/' + id.toString();

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

export { getContracts, getContractById };