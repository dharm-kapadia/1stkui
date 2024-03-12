import axios from 'axios';
import { useEffect, useState } from 'react';

import { Paper, Stack, TableContainer } from '@mui/material';

import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';

const columns = [
  { key: 'id', name: 'Id', resizable: true },
  { key: 'time', name: 'Time', resizable: true },
  { key: 'type', name: 'Type', resizable: true },
  { key: 'source', name: 'Source', resizable: true },
  { key: 'subject', name: 'Subject', resizable: true },
  { key: 'relatedprocess', name: 'Related Process', resizable: true },
  { key: 'relatedsubprocess', name: 'Related SubProcess', resizable: true },
  { key: 'data', name: 'Data', resizable: true }
];

const tableStyle = { width: '100%', height: '100%', borderRadius: '5px' };

const EventsPage = () => {
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

export default EventsPage;
