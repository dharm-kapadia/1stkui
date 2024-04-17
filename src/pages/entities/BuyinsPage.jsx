import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';

const columns = [
  { field: 'buyinInitiatedId', headerName: 'Buyin Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'buyinDate', headerName: 'Buyin Date', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'contractId', headerName: 'Contract Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'status', headerName: 'Status', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'openQuantity', headerName: 'Open Qty', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'quantity', headerName: 'Quantity', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'buyinInitiatedLastUpdateDatetime',
    headerName: 'Buy-In Initiated Last Update DateTime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'buyinCompleteId',
    headerName: 'Buy-In Complete Id',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'value', headerName: 'Value', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'currency', headerName: 'Currency', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'unit', headerName: 'Unit', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'valueDate', headerName: 'Value Date', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'buyinCompletedLastUpdateDatetime',
    headerName: 'Buy-In Completed Last Update DateTime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  }
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
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
          Buy Ins
        </Typography>
      </Stack>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function ReactTable({ columns, rows, loading }) {
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
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main'
              }
            }}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'buyinDate', sort: 'desc' }]
              }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={rows}
            columns={columns}
            loading={loading}
          />
        </Box>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  loading: PropTypes.bool
};

const BuyinsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = localStorage.getItem('url') + '/cloudevents';
    const token = localStorage.getItem('token');

    let respData = [];

    // Get cloudevents using Bearer token
    (async () => {
      setLoading(true);
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

        setLoading(false);
      }

      setData(respData);
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} loading={loading} />;
};

export default BuyinsPage;
