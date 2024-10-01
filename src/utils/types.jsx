export const GenericResponse = {
  responseid: '',
  code: '',
  hits: '',
  message: ''
};

export const User = {
  username: '',
  isLoggedIn: false
};

// Connector ENUMS

export const Benchmark = {
  EFFR: 'EFFR',
  OBFR: 'OBFR',
  TGCR: 'TGCR',
  BFCR: 'BFCR',
  SOFR: 'SOFR',
  BGCR: 'BGCR'
};
Object.freeze(Benchmark);

export const CloudEventType = {
  TRADE_AGREED: 'TRADE_AGREED',
  TRADE_CANCELED: 'TRADE_CANCELED',
  CONTRACT_PROPOSED: 'CONTRACT_PROPOSED',
  CONTRACT_PENDING: 'CONTRACT_PENDING',
  CONTRACT_CANCELED: 'CONTRACT_CANCELED',
  CONTRACT_CANCEL_PENDING: 'CONTRACT_CANCEL_PENDING',
  CONTRACT_DECLINED: 'CONTRACT_DECLINED',
  CONTRACT_OPENED: 'CONTRACT_OPENED',
  CONTRACT_ALLOCATION: 'CONTRACT_ALLOCATION',
  CONTRACT_SPLIT: 'CONTRACT_SPLIT',
  SETTLEMENT_STATUS_UPDATE: 'SETTLEMENT_STATUS_UPDATE',
  SETTLEMENT_INSTRUCTION_UPDATE: 'SETTLEMENT_INSTRUCTION_UPDATE',
  RERATE_PROPOSED: 'RERATE_PROPOSED',
  RERATE_PENDING: 'RERATE_PENDING',
  RERATE_CANCELED: 'RERATE_CANCELED',
  RERATE_CANCEL_PENDING: 'RERATE_CANCEL_PENDING',
  RERATE_DECLINED: 'RERATE_DECLINED',
  RERATE_APPLIED: 'RERATE_APPLIED',
  RETURN_PROPOSED: 'RETURN_PROPOSED',
  RETURN_PENDING: 'RETURN_PENDING',
  RETURN_SETTLED: 'RETURN_SETTLED',
  RETURN_CANCELED: 'RETURN_CANCELED',
  RECALL_PROPOSED: 'RECALL_PROPOSED',
  RECALL_PENDING: 'RECALL_PENDING',
  RECALL_SETTLED: 'RECALL_SETTLED',
  RECALL_CANCELED: 'RECALL_CANCELED',
  BUYIN_PROPOSED: 'BUYIN_PROPOSED',
  BUYIN_PENDING: 'BUYIN_PENDING',
  BUYIN_CANCELED: 'BUYIN_CANCELED',
  BUYIN_COMPLETED: 'BUYIN_COMPLETED',
  DELEGATION_PROPOSED: 'DELEGATION_PROPOSED',
  DELEGATION_APPROVED: 'DELEGATION_APPROVED',
  DELEGATION_CANCELED: 'DELEGATION_CANCELED'
};
Object.freeze(CloudEventType);

export const CollateralDescription = {
  NONUSAGENCIES: 'NONUSAGENCIES',
  AGENCIES: 'AGENCIES',
  CANADIANBONDS: 'CANADIANBONDS',
  CANADIANPROVINCIALS: 'CANADIANPROVINCIALS',
  CORPORATES: 'CORPORATES',
  DEBT: 'DEBT',
  EMUDEBTAAA: 'EMUDEBTAAA',
  EMUDEBT: 'EMUDEBT',
  AUSTRALIANEQUITIES: 'AUSTRALIANEQUITIES',
  EQUITIES: 'EQUITIES',
  GOVTDEBT105: 'GOVTDEBT105',
  G10DEBT: 'G10DEBT',
  G3DEBT: 'G3DEBT',
  G8DEBT: 'G8DEBT',
  UKGILTS: 'UKGILTS',
  GOVERNMENTISSUES: 'GOVERNMENTISSUES',
  GOVERNMENTISSUESAAA: 'GOVERNMENTISSUESAAA',
  HIGHGRADEEQUITIES: 'HIGHGRADEEQUITIES',
  INVESTMENTGRADECORPORATES: 'INVESTMENTGRADECORPORATES',
  JAPANESEGOVERNMENTBONDS: 'JAPANESEGOVERNMENTBONDS'
};
Object.freeze(CollateralDescription);

export const CollateralType = {
  CASH: 'CASH',
  NONCASH: 'NONCASH',
  CASHPOOL: 'CASHPOOL',
  TRIPARTY: 'TRIPARTY'
};
Object.freeze(CollateralType);

export const ContractStatus = {
  PROPOSED: 'PROPOSED',
  APPROVED: 'APPROVED',
  CANCELED: 'CANCELED',
  DECLINED: 'DECLINED',
  OPEN: 'OPEN'
};
Object.freeze(ContractStatus);

export const CurrencyCd = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  AUD: 'AUD',
  HKD: 'HKD',
  CAD: 'CAD',
  CHF: 'CHF',
  SEK: 'SEK',
  SGD: 'SGD',
  NOK: 'NOK',
  DKK: 'DKK'
};
Object.freeze(CurrencyCd);

export const EventType = {
  ALLOCATION: 'ALLOCATION',
  BUYIN: 'BUYIN',
  BUYIN_APPROVE: 'BUYIN_APPROVE',
  BUYIN_CANCEL: 'BUYIN_CANCEL',
  BUYIN_COMPLETE: 'BUYIN_COMPLETE',
  CONTRACT_CANCELED: 'CONTRACT_CANCELED',
  CONTRACT_CANCEL_PENDING: 'CONTRACT_CANCEL_PENDING',
  CONTRACT_DECLINED: 'CONTRACT_DECLINED',
  CONTRACT_PENDING: 'CONTRACT_PENDING',
  CONTRACT_OPENED: 'CONTRACT_OPENED',
  CONTRACT_PROPOSED: 'CONTRACT_PROPOSED',
  RECALL: 'RECALL',
  RECALL_CANCEL: 'RECALL_CANCEL',
  RERATE: 'RERATE',
  RERATE_PROPOSED: 'RERATE_PROPOSED',
  RERATE_APPROVE: 'RERATE_APPROVE',
  RERATE_CANCEL: 'RERATE_CANCEL',
  RERATE_DECLINE: 'RERATE_DECLINE',
  RETURN: 'RETURN',
  RETURN_CANCEL: 'RETURN_CANCEL',
  SPLIT: 'SPLIT',
  TRADE_AGREED: 'TRADE_AGREED',
  TRADE_CANCELED: 'TRADE_CANCELED'
};
Object.freeze(EventType);

export const PartyRole = {
  BORROWER: 'BORROWER',
  LENDER: 'LENDER',
  TRIPARTY: 'TRIPARTY',
  CCP: 'CCP'
};
Object.freeze(PartyRole);

export const PriceUnit = {
  SHARE: 'SHARE',
  LOT: 'LOT'
};
Object.freeze(PriceUnit);

export const ProcessingStatus = {
  APPROVED: 'APPROVED',
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  DECLINED: 'DECLINED',
  DISCREPANCIES: 'DISCREPANCIES',
  PROPOSED: 'PROPOSED',
  MATCHED_CANCELED_POSITION: 'MATCHED_CANCELED_POSITION',
  MATCHED_POSITION: 'MATCHED_POSITION',
  NEW: 'NEW',
  ONESOURCE_ISSUE: 'ONESOURCE_ISSUE',
  PROCESSED: 'PROCESSED',
  PROPOSAL_APPROVED: 'PROPOSAL_APPROVED',
  PROPOSAL_CANCELED: 'PROPOSAL_CANCELED',
  PROPOSAL_DECLINED: 'PROPOSAL_DECLINED',
  RECONCILED: 'PROPOSAL_DECLINED',
  TRADE_DISCREPANCIES: 'TRADE_DISCREPANCIES',
  TRADE_RECONCILED: 'TRADE_RECONCILED',
  TRADE_CANCELED: 'TRADE_CANCELED',
  SAVED: 'SAVED',
  SETTLED: 'SETTLED',
  SI_FETCHED: 'SI_FETCHED',
  SPIRE_ISSUE: 'SPIRE_ISSUE',
  SPIRE_POSITION_CANCELED: 'SPIRE_POSITION_CANCELED',
  TO_CANCEL: 'TO_CANCEL',
  TO_DECLINE: 'TO_DECLINE',
  UPDATED: 'UPDATED',
  VALIDATED: 'VALIDATED',
  MATCHED_RERATE_TRADE: 'MATCHED_RERATE_TRADE'
};
Object.freeze(ProcessingStatus);

export const RelatedProposalType = {
  CONTRACT: 'CONTRACT',
  RERATE: 'RERATE'
};
Object.freeze(RelatedProposalType);

export const RoundingMode = {
  ALWAYSUP: 'ALWAYSUP',
  ALWAYSDOWN: 'ALWAYSDOWN',
  STANDARD: 'STANDARD',
  EXACT: 'EXACT'
};
Object.freeze(RoundingMode);

export const SettlementStatus = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  MADE: 'MADE',
  SETTLED: 'SETTLED'
};
Object.freeze(SettlementStatus);

export const SettlementType = {
  DVP: 'DVP',
  FOP: 'FOP'
};
Object.freeze(SettlementType);

export const TermType = {
  OPEN: 'TERM',
  TERM: 'OPEN'
};
Object.freeze(TermType);

export const VenueType = {
  ONPLATFORM: 'ONPLATFORM',
  OFFPLATFORM: 'OFFPLATFORM'
};

// Connector API Schemas

export const Collateral = {
  loanPrice: 0.0,
  loanValue: 0.0,
  collateralValue: 0.0,
  currency: CurrencyCd,
  tyep: CollateralType,
  descriptionCd: CollateralDescription,
  margin: 0.0,
  roundingRule: 0.0,
  roundingMode: RoundingMode
};

export const Loan = {
  loanId: '',
  lastEvent: TradeEvent,
  settlementStatus: SettlementStatus,
  loanStatus: LoanStatus,
  lastUpdatePartyId: 0,
  lastUpdateDatetime: '',
  trade: TradeAgreement,
  settlement: Settlements,
  processingStatus: ProcessingStatus,
  eventType: EventType,
  matchingSpirePositionId: ''
};

export const DeclinedInstruction = {
  declinedInstructionId: '',
  relatedExceptionEventId: '',
  relatedProposalId: '',
  relatedProposalType: RelatedProposalType,
  creationDateTime: '',
  userId: '',
  declineReasonCode: '',
  declineReasonText: ''
};

export const FeeRate = {
  baseRate: 0.0,
  effectiveRate: 0.0,
  effectiveDate: '',
  cutOffTime: ''
};

export const FixedRate = {
  baseRate: 0.0,
  effectiveRate: 0.0,
  effectiveDate: '',
  cutOffTime: ''
};

export const FloatingRate = {
  benchmark: Benchmark,
  baseRate: 0.0,
  spread: 0.0,
  effectiveRate: 0.0,
  isAutoRate: false,
  effectiveDateDelay: 0,
  effectiveDate: '',
  cutOffTime: ''
};

export const Instrument = {
  ticker: '',
  cusip: '',
  isin: '',
  sedol: '',
  quick: '',
  figi: '',
  description: '',
  price: Price
};

export const InternalReference = {
  brokerCd: '',
  accountId: '',
  internalRefId: ''
};

export const LocalVenueField = {
  localFieldName: '',
  localFieldValue: ''
};

export const LocalVenueFields = {
  items: [LocalVenueField]
};

export const NackInstructions = {
  nackInstructionId: '',
  relatedCloudEventId: '',
  relatedReturnId: '',
  creationDateTime: '',
  userId: '',
  nackReasonCode: '',
  nackReasonText: ''
};

export const PageReponse = {
  totalItems: 0,
  currentPage: 0,
  totalPages: 0,
  items: []
};

export const Party = {
  partyId: '',
  partyName: '',
  gleifLei: '',
  internalPartyId: ''
};

export const Price = {
  value: 0.0,
  currency: '',
  unit: PriceUnit
};

export const RebateRate = {
  fixed: FixedRate,
  floating: FloatingRate
};

export const Rate = {
  rebate: RebateRate,
  fee: FeeRate
};

export const SettlementInstruction = {
  settlementBic: '',
  localAgentBic: '',
  localAgentName: '',
  localAgentAcct: '',
  dtcParticipantNumber: ''
};

export const Settlement = {
  instructionId: 0,
  partyRole: PartyRole,
  settlementInstruction: SettlementInstruction
};

export const Settlements = {
  items: [Settlement]
};

export const TradeAgreement = {
  instrument: Instrument,
  rate: Rate,
  quantity: 0,
  billingCurrency: CurrencyCd,
  dividentRatePct: 0,
  tradeDate: '',
  termType: TermType,
  termDate: '',
  settlementDate: '',
  settlementType: SettlementType,
  collateral: Collateral,
  transactingParties: TransactingParties,
  executionVenue: Venue
};

export const TradeEvent = {
  eventId: 0,
  eventType: EventType,
  eventDateTime: '',
  resourceUri: ''
};

export const TransactingParty = {
  partyRole: PartyRole,
  party: Party,
  internalRef: InternalReference
};

export const TransactingParties = {
  items: [TransactingParty]
};

export const VenueParty = {
  partyRole: PartyRole,
  venueId: ''
};

export const VenueParties = {
  items: [VenueParty]
};

export const Venue = {
  partyId: '',
  type: VenueType,
  venueName: '',
  venueRefKey: '',
  transactionDateTime: '',
  VenueParties: VenueParties,
  localVenueField: LocalVenueFields
};
