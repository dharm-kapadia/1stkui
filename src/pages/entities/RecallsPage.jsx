import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getRecalls } from 'services/recalls';

const columns = [
  { field: 'recallId', headerName: 'Recall Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'loanId', headerName: 'Loan Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'status', headerName: 'Status', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'executionVenue', headerName: 'Execution Venue', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'openQuantity', headerName: 'Open Quantity', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'quantity', headerName: 'Quantity', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'recallDate', headerName: 'Recall Date', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'recallDueDate', headerName: 'Recall Due Date', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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

  function refreshRecallsData() {
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
          Recalls
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshRecallsData();
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

const RecallsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getRecallsData() {
    setLoading(true);

    let recalls = await getRecalls();
    setData(recalls);

    setLoading(false);
  }

  useEffect(() => {
    getRecallsData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getRecallsData();
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
                sortModel: [{ field: 'recallDate', sort: 'desc' }]
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

export default RecallsPage;
