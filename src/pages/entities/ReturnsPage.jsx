import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getReturns } from 'services/returns';

const columns = [
  { field: 'id', headerName: 'Return Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'loanId', headerName: 'Loan Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'quantity', headerName: 'Quantity', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'returnDate', headerName: 'Return Date', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'status', headerName: 'Status', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'partyId', headerName: 'Party Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'returnType', headerName: 'Return Type', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'venueName', headerName: 'Venue Name', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'venueRefKey', headerName: 'Venue Ref Key', width: 170, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'transactionDatetime',
    headerName: 'Transaction Datetime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'partyRole', headerName: 'Party Role', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'venueRefPartyKey',
    headerName: 'Venue Ref Party Key',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'localVenueFieldName',
    headerName: 'Local Venue Field Name',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'localVenueFieldValue',
    headerName: 'Local Venue Field Value',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'lastUpdateDatetime',
    headerName: 'Last Update Datetime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  }
];

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  function refreshReturnsData() {
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
          Returns
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshReturnsData();
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

const ReturnsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getReturnsData() {
    setLoading(true);

    let returns = await getReturns();
    setData(returns);

    setLoading(false);
  }

  useEffect(() => {
    getReturnsData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getReturnsData();
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
                sortModel: [{ field: 'returnDate', sort: 'desc' }]
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

export default ReturnsPage;
