import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { declineLoan } from 'services/loans';
import { getPending } from 'services/pending';

const columns = [
  { field: 'id', headerName: 'Event Id', width: 250, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'time', headerName: 'Event Time', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'type', headerName: 'Event Type', width: 300, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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

  { field: 'message', headerName: 'Pending Details', width: 500, headerAlign: 'center', headerClassName: 'super-app-theme--header' }
];

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  function refreshPendingData() {
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
          Pending
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshPendingData();
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

const PendingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleRowDoubleClick(params) {
    if (params.row.type === 'LOAN_CONTRACT_PROPOSAL_UNMATCHED') {
      if (confirm('Decline loan with id: ' + params.row.id)) {
        const token = localStorage.getItem('token');
        const resp = await declineLoan(token, params.row.id);

        console.log(resp);
      } else {
        alert(`"Cancelled declining loan with id: ${params.row.id}"`);
      }
    }
  }

  async function getPendingData() {
    setLoading(true);

    let pending = await getPending();
    setData(pending);

    setLoading(false);
  }

  useEffect(() => {
    getPendingData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getPendingData();
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
            getRowHeight={() => 'auto'}
            initialState={{
              // ...data.initialState,
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'time', sort: 'desc' }]
              }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={data}
            columns={columns}
            onRowDoubleClick={handleRowDoubleClick}
            loading={loading}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default PendingPage;
