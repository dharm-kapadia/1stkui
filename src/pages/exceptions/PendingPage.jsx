import { Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import { filterForUnmatched } from 'utils/jsonHelper';

const columns = [
  { field: 'id', headerName: 'Event Id', width: 250, headerAlign: 'center' },
  { field: 'time', headerName: 'Event Time', width: 150, headerAlign: 'center' },
  { field: 'type', headerName: 'Event Type', width: 300, headerAlign: 'center' },
  { field: 'subject', headerName: 'Subject', width: 150, headerAlign: 'center' },
  { field: 'relatedprocess', headerName: 'Related Lifecycle Event', width: 200, headerAlign: 'center' },
  { field: 'message', headerName: 'Pending Details', width: 500, headerAlign: 'center' }
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
        Pending
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
        <div style={{ height: 675, width: '100%' }}>
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
        </div>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};

// ==============================|| REACT TABLE - EMPTY ||============================== //

const PendingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/cloudevents';
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

          let vals = filterForUnmatched(respData);
          setData(vals);
        }
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default PendingPage;
