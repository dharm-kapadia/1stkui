import { IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UpdateIcon from '@mui/icons-material/Update';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { getEvents } from 'services/events';

const columns = [
  { field: 'id', headerName: 'Event Id', width: 250, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'time', headerName: 'Event Time', width: 150, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'type', headerName: 'Event Type', width: 300, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'subject', headerName: 'Subject', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'relatedprocess',
    headerName: 'Related Lifecycle Event',
    width: 200,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'message', headerName: 'Event Details', width: 500, headerAlign: 'center', headerClassName: 'super-app-theme--header' }
];

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  function refreshEventsData() {
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
          Events
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> </Box>
        <Tooltip title="Refresh data">
          <IconButton
            sx={{ flex: '1 1' }}
            color="primary"
            onClick={() => {
              refreshEventsData();
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

const EventsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getEventsData() {
    setLoading(true);

    let events = await getEvents();
    setData(events);

    setLoading(false);
  }

  useEffect(() => {
    getEventsData();
  }, []);

  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar
          numSelected={0}
          onChange={() => {
            getEventsData();
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
                sortModel: [{ field: 'time', sort: 'desc' }]
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

export default EventsPage;
