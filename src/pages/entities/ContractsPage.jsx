import { Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { flattenContracts } from 'utils/jsonHelper';

const columns = [
  { field: 'id', headerName: 'Contract Id', width: 250, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'contractStatus', headerName: 'Contract Status', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'createDateTime', headerName: 'Create Datetime', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'lastDateTime',
    headerName: 'Last Update Datetime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'matchingSpirePositionId',
    headerName: 'Matching Spire Position Id',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'matchingSpireTradeId',
    headerName: 'Matching Spire Trade Id',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'processingStatus',
    headerName: 'Processing Status',
    width: 125,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'billingCurrency',
    headerName: 'billingCurrency',
    width: 100,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'venueRefId', headerName: 'Venue Ref Id', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'cusip', headerName: 'CUSIP', width: 100, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'isin', headerName: 'ISIN', width: 100, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'sedol', headerName: 'SEDOL', width: 100, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'ticker', headerName: 'Ticker', width: 100, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'tradeDate', headerName: 'Trade Date', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'settlementDate', headerName: 'Settlement Date', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'collateralType', headerName: 'Collateral Type', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'collateralCurrency',
    headerName: 'Collateral Currency',
    width: 125,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'internalPartyId',
    headerName: 'Internal Party Id',
    width: 125,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'accountId', headerName: 'accountId', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' }
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
      <Typography sx={{ flex: '1 1 100%' }} variant="h4" id="tableTitle" component="div">
        Contracts
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function ReactTable({ columns, rows }) {
  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={'0'} />
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
              pagination: { paginationModel: { pageSize: 20 } }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={rows}
            columns={columns}
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

const ContractsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';
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
        }

        const items = flattenContracts(respData);
        setData(items);
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default ContractsPage;
