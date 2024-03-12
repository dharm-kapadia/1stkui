import axios from 'axios';
import { useEffect, useState } from 'react';

import { Paper, Stack, TableContainer } from '@mui/material';

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';

const columns = [
  { key: 'buyinInitiatedId', name: 'Buyin Initiated Id', resizable: true },
  { key: 'buyinDate', name: 'Buyin Date', resizable: true },
  { key: 'contractId', name: 'Contract Id', resizable: true },
  { key: 'status', name: 'Status', resizable: true },
  { key: 'openQuantity', name: 'Open Qty', resizable: true },
  { key: 'quantity', name: 'Qty', resizable: true },
  { key: 'buyinInitiateILastUpdateDatetime', name: 'Buyin Initiated Last Update Datetime', resizable: true },
  { key: 'buyinCompleteId', name: 'Buyin Completed Id', resizable: true },
  { key: 'value', name: 'Value', resizable: true },
  { key: 'currency', name: 'Currency', resizable: true },
  { key: 'unit', name: 'Unit', resizable: true },
  { key: 'valueDate', name: 'Value Date', resizable: true },
  { key: 'buyinCompleteLastUpdateDatetime"', name: 'Buyin Completed Last Update Datetime', resizable: true }
];

const tableStyle = { width: '100%', height: '100%', borderRadius: '5px' };

const BuyinsPage = () => {
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevents';
    const token = localStorage.getItem('token');
    setCols(columns);

    // Get cloudevents using Bearer token
    (async () => {
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData([]);
      console.log(result);
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

export default BuyinsPage;
