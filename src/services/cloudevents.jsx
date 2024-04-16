import axios from 'axios';

/**
 * Retrieve CloudEvents based on various query parameters.
 * Supports filtering by each field separately or in combination,
 * date range queries, sorting, and pagination.
 *
 * @return {Array} The array of cloud events
 */
export const getCloudEvents = async (token) => {
  const url = localStorage.getItem('url') + '/cloudevents';

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (result.status == 200 && result.data.totalItems !== 0) {
      var respData = result.data.items;

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

      // Filter out events with _TECHNICAL
      let filtered = respData.filter((item) => !item.type.includes('TECHNICAL'));

      return filtered;
    }
  } catch (error) {
    console.log(error);
    return '0';
  }
};

/**
 * Retrieve a specific CloudEvent by ID
 *
 * @param {string} token    Bearer token for API authentication
 *
 * @return {} The cloud event report
 */
export const getCloudEventById = async (token, id) => {
  const url = localStorage.getItem('url') + '/cloudevents' + '/' + id.toString();

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
    return '0';
  }
};

/**
 * Retrieve aggregated data of CloudEvents based on type or processing status.
 *
 * @param {string} token        Bearer token for API authentication
 * @param {string} aggregateBy  Aggregate by 'type' or 'processingStatus'
 * @param {string} starteDate
 * @param {string} endDate
 *
 * @return {Array} The cloud event report
 */
export const getCloudEventsReport = async (token) => {
  const url = localStorage.getItem('url') + '/cloudevents/report';

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
    return '0';
  }
};
