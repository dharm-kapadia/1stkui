import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { darken, lighten, styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getLoans } from 'services/loans';

const columns = [
  { field: 'id', headerName: 'Loan Id', width: 250, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'loanStatus', headerName: 'Loan Status', width: 125, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'createDateTime', headerName: 'Create Datetime', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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
    headerName: 'Billing Currency',
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

  function refreshLoansData() {
    props.onChange();
  }

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
        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
          Loans
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshLoansData();
            }}
          >
            <UpdateIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

const getBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7));

const getHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6));

const getSelectedBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5));

const getSelectedHoverBackgroundColor = (color, mode) => (mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .super-app-theme--PROPOSED': {
    backgroundColor: getBackgroundColor(theme.palette.info.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.info.main, theme.palette.mode)
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.info.main, theme.palette.mode),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.info.main, theme.palette.mode)
      }
    }
  },
  '& .super-app-theme--OPEN': {
    backgroundColor: getBackgroundColor(theme.palette.success.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.success.main, theme.palette.mode)
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.success.main, theme.palette.mode),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.success.main, theme.palette.mode)
      }
    }
  },
  '& .super-app-theme--PENDING': {
    backgroundColor: getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.warning.main, theme.palette.mode)
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.warning.main, theme.palette.mode),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.warning.main, theme.palette.mode)
      }
    }
  },
  '& .super-app-theme--DECLINED': {
    backgroundColor: getBackgroundColor(theme.palette.error.main, theme.palette.mode),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode)
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(theme.palette.error.main, theme.palette.mode),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(theme.palette.error.main, theme.palette.mode)
      }
    }
  }
}));

const LoansPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getLoansData() {
    setLoading(true);

    let loans = await getLoans();
    setData(loans);

    setLoading(false);
  }

  useEffect(() => {
    getLoansData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getLoansData();
          }}
        />
        <Box
          sx={{
            height: 725,
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: '#3498DB',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: 14
            }
          }}
        >
          <StyledDataGrid
            sx={{
              boxShadow: 1,
              border: 1,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main'
              }
            }}
            initialState={{
              // ...data.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'createDateTime', sort: 'desc' }]
              }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={data}
            columns={columns}
            getRowClassName={(params) => `super-app-theme--${params.row.loanStatus}`}
            loading={loading}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default LoansPage;
