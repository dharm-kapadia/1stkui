import axios from 'axios';
import { create_decline_instruction_id } from 'utils/routines';

const flattenLoans = (input) => {
  // Iterate through the API call response and create flattened Loan objects
  var loans = [];

  input.forEach((item) => {
    var loan = {};

    if (item !== null) {
      loan['id'] = item.loanId;
      loan['loanStatus'] = item.loanStatus;
      loan['createDateTime'] = item.createDateTime.replace('T', ' ').substring(0, 19);
      loan['lastUpdateDateTime'] = item.lastUpdateDateTime.replace('T', ' ').substring(0, 19);
      loan['matchingSpirePositionId'] = item.matchingSpirePositionId;
      loan['matchingSpireTradeId'] = item.matchingSpireTradeId;
      loan['processingStatus'] = item.processingStatus;
      loan['ticker'] = item.trade.instrument.ticker;
      loan['cusip'] = item.trade.instrument.cusip;
      loan['isin'] = item.trade.instrument.isin;
      loan['sedol'] = item.trade.instrument.sedol;
      loan['quick'] = item.trade.instrument.quick;
      loan['rebateRate'] = item.trade.rate.rebateRate;
      loan['quantity'] = item.trade.quantity;
      loan['billingCurrency'] = item.trade.billingCurrency;
      loan['dividendRatePct'] = item.trade.dividendRatePct;
      loan['tradeDate'] = item.trade.tradeDate;
      loan['termType'] = item.trade.termType;
      loan['termDate'] = item.trade.termDate;
      loan['settlementType'] = item.trade.settlementType;
      loan['settlementDate'] = item.trade.settlementDate;
      loan['loanPrice'] = item.trade.collateral.loanPrice;
      loan['loanValue'] = item.trade.collateral.loanValue;
      loan['collateralValue'] = item.trade.collateral.collateralValue;
      loan['collateralCurrency'] = item.trade.collateral.currency;
      loan['collateralType'] = item.trade.collateral.type;
      loan['collateralMargin'] = item.trade.collateral.margin;
      loan['roundingRule'] = item.trade.collateral.roundingRule;
      loan['roundingMode'] = item.trade.collateral.roundingMode;
      loan['venueRefId'] = item.trade.venues[0].venueRefKey;
      loan['internalPartyId'] = item.trade.transactingParties[0].party.partyId;
      loan['internalRefId'] = item.trade.transactingParties[0].internalRef.internalRefId;
      loan['accountId'] = item.trade.transactingParties[0].internalRef.accountId;
      loan['tradeDate'] = item.trade.tradeDate;
      loan['settlementDate'] = item.trade.settlementDate;

      loans.push(loan);
    }
  });

  return loans;
};

/**
 * Retrieve total number of loans by querying the /loans endpoint
 * and extracting resp.data.totalItems
 *
 */
const getNumLoans = async (token) => {
  const url = localStorage.getItem('url') + '/loans';

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
 * Retrieve 1Source Loan information based on
 * various query parameters. Supports filtering by each
 * field separately or in combination, date range queries,
 * sorting, and pagination.
 *
 * @param {string} token    Bearer token for API authentication
 * @param {string} loanId
 * @param {string} processingStatus
 * @param {integer} matchingSpirePositionId
 * @param {string} loanStatus
 * @param {string} sinceLastUpdateDate    Loan last update date (since), included, in the format 'yyyy-MM-dd'
 * @param {string} beforeLastUpdateDate   Loan last update date (before), excluded, in the format 'yyyy-MM-dd'
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
 * @param {string} sort     Sort by specified fields (e.g., 'loanId')
 * @param {integer} page    Defaults to 0
 * @param {integer} limit   Defaults to 20
 *
 * @return {Array} The array of loans
 */
const getLoans = async () => {
  const url = localStorage.getItem('url') + '/loans';
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

    return flattenLoans(respData);
  }
};

/**
 * Retrieve a specific 1Source Loan by ID
 *
 * @param {string} token    Bearer token for API authentication
 * @param {integer} id      Loan loan id
 *
 * @return {Array}  Loan loan
 */

const getLoanById = async (token, id) => {
  const url = localStorage.getItem('url') + '/loans' + '/' + id.toString();

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

const declineLoan = async (row) => {
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
        relatedProposalType: 'LOAN',
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

export { declineLoan, flattenLoans, getLoanById, getLoans, getNumLoans };
