import axios from 'axios';

/**
 * Retrieve total number of contracts by querying the /contracts endpoint
 * and extracting resp.data.totalItems
 *
 */
const getNumContracts = async (token) => {
  const url = localStorage.getItem('url') + '/contracts';

  try {
    let resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (resp.status == 200) {
      return resp.data.totalItems;
    }
  } catch (error) {
    console.log(error);
    return '{}';
  }
};

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
const getContracts = async (token) => {
  const url = localStorage.getItem('url') + '/contracts';

  try {
    let resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (resp.status == 200) {
      return resp;
    }
  } catch (error) {
    console.log(error);
    return '{}';
  }
};

/**
 * Retrieve a specific 1Source Loan Contract by ID
 *
 * @param {string} token    Bearer token for API authentication
 * @param {integer} id      Loan contract id
 *
 * @return {Array}  Loan contract
 */

const getContractById = async (token, id) => {
  const url = localStorage.getItem('url') + '/contracts' + '/' + id.toString();

  try {
    let resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (resp.status == 200) {
      return resp;
    }
  } catch (error) {
    console.log(error);
    return '{}';
  }
};

const declineContract = async (token, id) => {
  const url = localStorage.getItem('url') + '/contracts' + '/' + id.toString() + '/decline';

  try {
    let resp = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (resp.status == 200) {
      return resp;
    }
  } catch (error) {
    console.log(error);
    return '{}';
  }
};

export { declineContract, getNumContracts, getContracts, getContractById };
