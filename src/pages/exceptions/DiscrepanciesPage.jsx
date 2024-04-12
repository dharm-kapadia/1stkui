import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import ErrorOutline from '@mui/icons-material/ErrorOutline';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { declineContract } from 'services/contracts';
import { filterForDiscrepancies } from 'utils/jsonHelper';

const columns = [
  { field: 'id', headerName: 'Event Id', width: 275, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'time', headerName: 'Event Time', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'type', headerName: 'Event Type', width: 325, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'subject', headerName: 'Subject', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'relatedprocess',
    headerName: 'Related Lifecycle Event',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'relatedProcessId',
    headerName: 'Related Event Id',
    width: 275,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'message', headerName: 'Discrepancy Details', width: 400, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'fields', headerName: 'Discrepancy fields', width: 400, headerAlign: 'center', headerClassName: 'super-app-theme--header' }
];

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
      }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <IconButton color="primary" aria-label="Discrepancies" size="medium">
          <ErrorOutline />
        </IconButton>
        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
          Discrepancies
        </Typography>
      </Stack>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function ReactTable({ columns, rows }) {
  async function handleRowDoubleClick(params) {
    if (confirm('Decline contract with id: ' + params.row.id)) {
      const token = localStorage.getItem('token');
      const resp = await declineContract(token, params.row.id);

      console.log(resp);
    } else {
      alert(`"${params.row.id}" NOT declined`);
    }
  }

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={0} />
        <Box
          sx={{
            height: 675,
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: '#3498DB',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 14
            }
          }}
        >
          <DataGrid
            sx={{
              boxShadow: 1,
              border: 1,
              fontSize: 13,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main'
              }
            }}
            getRowHeight={() => 'auto'}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 20 } }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={rows}
            columns={columns}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </Box>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};

const DiscrepanciesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevents';
    const token = localStorage.getItem('token');

    let respData = [];

    // Get cloudevents using Bearer token
    (async () => {
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

          let vals = filterForDiscrepancies(respData);
          setData(vals);
        }
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default DiscrepanciesPage;
