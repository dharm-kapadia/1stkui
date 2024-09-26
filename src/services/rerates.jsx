import axios from 'axios';

export const mapRerates = (items) => {
  var rerates = [];

  items.forEach((item) => {
    var obj = {};

    obj['id'] = item.rerateId;
    obj['loanId'] = item.loanId;
    obj['rerateStatus'] = item.rerateStatus;
    obj['processingStatus'] = item.processingStatus;
    obj['matchingSpireTradeId'] = item.matchingSpireTradeId;
    obj['originalBaseRate'] = item.rate.rebate.fixed.baseRate;
    obj['originalEffectiveRate'] = item.rate.rebate.fixed.effectiveRate;
    obj['proposedBaseRate'] = item.rerate.rebate.fixed.baseRate;
    obj['proposedEffectiveRate'] = item.rerate.rebate.fixed.effectiveRate;
    obj['createDatetime'] = item.createDatetime.replace('T', ' ').substring(0, 19);
    obj['lastUpdateDatetime'] = item.lastUpdateDatetime.replace('T', ' ').substring(0, 19);
    obj['effectiveDate'] = item.effectiveDate.replace('T', ' ').substring(0, 19);

    rerates.push(obj);
  });

  return rerates;
};

/**
 * Retrieve total number of rerates by querying the /rerates endpoint
 * and extracting resp.data.totalItems
 *
 */
export const getNumRerates = async (token) => {
  const url = localStorage.getItem('url') + '/rerates';

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
 * @return {Array} The array of rerates
 */
export const getRerates = async () => {
  const url = localStorage.getItem('url') + '/rerates';
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

    return mapRerates(respData);
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

export const getRerateById = async (token, id) => {
  const url = localStorage.getItem('url') + '/rerates/' + id.toString();

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
