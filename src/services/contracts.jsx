import axios from 'axios';
import { create_decline_instruction_id } from 'utils/routines';

const flattenContracts = (input) => {
  // Iterate through the API call response and create flattened Contract objects
  var contracts = [];

  input.forEach((item) => {
    var contract = {};

    if (item !== null) {
      contract['id'] = item.contractId;
      contract['contractStatus'] = item.contractStatus;
      contract['createDateTime'] = item.createDateTime.replace('T', ' ').substring(0, 19);
      contract['lastUpdateDateTime'] = item.lastUpdateDateTime.replace('T', ' ').substring(0, 19);
      contract['matchingSpirePositionId'] = item.matchingSpirePositionId;
      contract['matchingSpireTradeId'] = item.matchingSpireTradeId;
      contract['processingStatus'] = item.processingStatus;
      contract['ticker'] = item.trade.instrument.ticker;
      contract['cusip'] = item.trade.instrument.cusip;
      contract['isin'] = item.trade.instrument.isin;
      contract['sedol'] = item.trade.instrument.sedol;
      contract['quick'] = item.trade.instrument.quick;
      contract['rebateRate'] = item.trade.rate.rebateRate;
      contract['quantity'] = item.trade.quantity;
      contract['billingCurrency'] = item.trade.billingCurrency;
      contract['dividendRatePct'] = item.trade.dividendRatePct;
      contract['tradeDate'] = item.trade.tradeDate;
      contract['termType'] = item.trade.termType;
      contract['termDate'] = item.trade.termDate;
      contract['settlementType'] = item.trade.settlementType;
      contract['settlementDate'] = item.trade.settlementDate;
      contract['contractPrice'] = item.trade.collateral.contractPrice;
      contract['contractValue'] = item.trade.collateral.contractValue;
      contract['collateralValue'] = item.trade.collateral.collateralValue;
      contract['collateralCurrency'] = item.trade.collateral.currency;
      contract['collateralType'] = item.trade.collateral.type;
      contract['collateralMargin'] = item.trade.collateral.margin;
      contract['roundingRule'] = item.trade.collateral.roundingRule;
      contract['roundingMode'] = item.trade.collateral.roundingMode;
      contract['venueRefId'] = item.trade.venues[0].venueRefKey;
      contract['internalPartyId'] = item.trade.transactingParties[0].party.partyId;
      contract['internalRefId'] = item.trade.transactingParties[0].internalRef.internalRefId;
      contract['accountId'] = item.trade.transactingParties[0].internalRef.accountId;
      contract['tradeDate'] = item.trade.tradeDate;
      contract['settlementDate'] = item.trade.settlementDate;

      contracts.push(contract);
    }
  });

  return contracts;
};

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
const getContracts = async () => {
  const url = localStorage.getItem('url') + '/contracts';
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

    return flattenContracts(respData);
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

const declineContract = async (row) => {
  const token = localStorage.getItem('token');
  const url = localStorage.getItem('url') + '/decline-instructions';
  const uuid4 = create_decline_instruction_id();

  try {
    // Create a unique declineInstructionId
    const creationDateTime = row.time.replace(' ', 'T').substring(0, 19);
    const userId = localStorage.getItem('username');

    let resp = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        declineInstructionId: uuid4,
        relatedExceptionEventId: row.id,
        relatedProposalId: row.relatedProcessId,
        relatedProposalType: 'CONTRACT',
        creationDateTime: creationDateTime,
        userId: userId
      }
    });

    if (resp.status == 200) {
      return resp;
    }
  } catch (error) {
    return error;
  }
};

export { declineContract, flattenContracts, getNumContracts, getContracts, getContractById };
