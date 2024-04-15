import axios from 'axios';

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
export const getRerates = async (token) => {
  const url = localStorage.getItem('url') + '/rerates';

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
