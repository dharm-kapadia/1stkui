import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getRerates } from 'services/rerates';

const columns = [
  { field: 'id', headerName: 'Rerate Id', width: 275, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'rerateStatus', headerName: 'Rerate Status', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'processingStatus',
    headerName: 'Processing Status',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'originalBaseRate',
    headerName: 'Original Base Rate',
    width: 150,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'proposedBaseRate',
    headerName: 'Proposed Base Rate',
    width: 150,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'effectiveDate',
    headerName: 'Effective Date',
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
  { field: 'loanId', headerName: 'Loan Id', width: 275, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'createDatetime', headerName: 'Create Datetime', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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

  function refreshReratesData() {
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
          Rerates
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshReratesData();
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

const ReratesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getReratesData() {
    setLoading(true);

    let rerates = await getRerates();
    setData(rerates);

    setLoading(false);
  }

  useEffect(() => {
    getReratesData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getReratesData();
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
              // ...data.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'createDatetime', sort: 'desc' }]
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

export default ReratesPage;
