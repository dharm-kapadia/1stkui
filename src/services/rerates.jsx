import axios from 'axios';

/**
 * Retrieve total number of rerates by querying the /rerates endpoint
 * and extracting resp.data.totalItems
 *
 */
const getNumRerates = async (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/rerates';

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
 * Retrieve 1Source Rerate information based on
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
 * @return {Array} The array of rerates
 */
const getRerates = async (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/rerates';

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
 * Retrieve a specific 1Source Rerate  by ID
 *
 * @param {string} token    Bearer token for API authentication
 * @param {integer} id      Rerate id
 *
 * @return {Array}  Rerate
 */

const getRerateById = async (token, id) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/rerates/' + id.toString();

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

export { getNumRerates, getRerates, getRerateById };
