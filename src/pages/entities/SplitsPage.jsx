import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getSplits } from 'services/splits';

const columns = [
  { field: 'splitId', headerName: 'Split Id', width: 250, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'status', headerName: 'Split Status', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'splitLots', headerName: 'Split Lots', width: 350, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'lastUpdateDatetime',
    headerName: 'Last Update Datetime',
    width: 150,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  }
];

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  function refreshSplitsData() {
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
          Loan Splits
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshSplitsData();
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

const SplitsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getSplitsData() {
    setLoading(true);

    let splits = await getSplits();
    setData(splits);

    setLoading(false);
  }

  useEffect(() => {
    getSplitsData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={0} onChange={() => getSplitsData()} />
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
              pagination: { paginationModel: { pageSize: 20 } }
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

export default SplitsPage;
