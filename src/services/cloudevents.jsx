import axios from 'axios';

/**
 * Retrieve CloudEvents based on various query parameters.
 * Supports filtering by each field separately or in combination,
 * date range queries, sorting, and pagination.
 *
 * @param {string} token Bearer token for API authentication
 * @param {string} id
 * @param {string} specVersion
 * @param {string} type
 * @param {string} source
 * @param {string} subject
 * @param {string} startime
 * @param {string} endtime
 * @param {string} sort   Sort by specified fields (e.g., 'type,-time')
 * @param {string} page   Defaults to 0
 * @param {string} limit  Defaults to 20
 *
 * @return {Array} The array of cloud events
 */
const getCloudEvents = (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevents';

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
 * Retrieve a specific CloudEvent by ID
 *
 * @param {string} token    Bearer token for API authentication
 *
 * @return {} The cloud event report
 */
const getCloudEventById = (token, id) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevent' + '/' + id.toString();

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
 * Retrieve aggregated data of CloudEvents based on type or processing status.
 *
 * @param {string} token        Bearer token for API authentication
 * @param {string} aggregateBy  Aggregate by 'type' or 'processingStatus'
 * @param {string} starteDate
 * @param {string} endDate
 *
 * @return {Array} The cloud event report
 */
const getCloudEventsReport = (token) => {
  const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevents/report';

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

export { getCloudEvents, getCloudEventById, getCloudEventsReport };
