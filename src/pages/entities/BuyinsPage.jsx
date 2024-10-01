import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getBuyIns } from 'services/buyins';

const columns = [
  { field: 'id', headerName: 'Buyin Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'buyinDate', headerName: 'Buyin Date', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'loanId', headerName: 'Loan Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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

  function refreshBuyInsData() {
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
          Buyins
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshBuyInsData();
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

const BuyinsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getBuyInsData() {
    setLoading(true);

    let buyins = await getBuyIns();
    setData(buyins);

    setLoading(false);
  }

  useEffect(() => {
    getBuyInsData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={0} onChange={() => getBuyInsData()} />
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
              ...data.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'buyinDate', sort: 'desc' }]
              }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={data}
            columns={columns}
            loading={loading}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default BuyinsPage;
