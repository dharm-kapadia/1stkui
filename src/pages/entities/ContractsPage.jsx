import axios from 'axios';
import { useEffect, useState } from 'react';

import { Paper, Stack, TableContainer } from '@mui/material';

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';

const columns = [
  { key: 'contractId', name: 'Contract ID', resizable: true },
  { key: 'contractStatus', name: 'Contract Status', resizable: true },
  { key: 'processingStatus', name: 'Processing Status', resizable: true },
  { key: 'trade.billingCurrency', name: 'Billing Currency', resizable: true },
  { key: 'sincelastupdatedate', name: 'Last Update Date (since)', resizable: true },
  { key: 'beforelastupdatedate', name: 'Last Update Date (before)', resizable: true },
  { key: 'venuerefid', name: 'Venue Ref Id', resizable: true },
  { key: 'cusip', name: 'CUSIP', resizable: true },
  { key: 'isin', name: 'ISIN', resizable: true },
  { key: 'sedol', name: 'SEDOL', resizable: true },
  { key: 'ticker', name: 'Ticker', resizable: true },
  { key: 'sincetradedate', name: 'Trade Date (since)', resizable: true },
  { key: 'beforetradedate', name: 'Trade Date (before)', resizable: true },
  { key: 'sincesettlementdate', name: 'Settlement Date (since)', resizable: true },
  { key: 'beforesettlementdate', name: 'Settlement Date (before)', resizable: true },
  { key: 'collateraltype', name: 'Collateral Type', resizable: true },
  { key: 'currency', name: 'Currency', resizable: true },
  { key: 'internalpartyid', name: 'Internal Party Id', resizable: true },
  { key: 'accountid', name: 'Account Id', resizable: true },
  { key: 'internalrefid', name: 'Internal Ref Id', resizable: true }
];

const tableStyle = { width: '100%', height: '100%', borderRadius: '5px' };

const ContractsPage = () => {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';
    const token = localStorage.getItem('token');
    setCols(columns);

    // Get contractgs using Bearer token
    (async () => {
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(result.data.items);
    })();
  }, []);

  return (
    <MainCard content={false}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="right" sx={{ padding: 2 }}>
        <CSVExport data={data} filename={'empty-table.csv'} />
      </Stack>
      <TableContainer component={Paper}>
        <DataGrid columns={cols} rows={data} style={tableStyle} />
      </TableContainer>
    </MainCard>
  );
};

export default ContractsPage;
