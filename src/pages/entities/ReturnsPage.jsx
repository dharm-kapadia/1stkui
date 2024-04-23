import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';

const columns = [
  { field: 'returnId', headerName: 'Return Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'contractId', headerName: 'Contract Id', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
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
        <IconButton color="primary" aria-label="Returns" size="medium">
          <KeyboardReturnOutlinedIcon />
        </IconButton>
        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
          Returns
        </Typography>
      </Stack>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

function ReactTable({ columns, rows, loading }) {
  return (
    <>
      <MainCard content={false} sx={{ width: '100%', overflow: 'hidden' }}>
        <EnhancedTableToolbar numSelected={0} />
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
              pagination: { paginationModel: { pageSize: 20 } },
              sorting: {
                sortModel: [{ field: 'returnDate', sort: 'desc' }]
              }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={rows}
            columns={columns}
            loading={loading}
          />
        </Box>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array,
  loading: PropTypes.bool
};

const ReturnsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = localStorage.getItem('url') + '/cloudevents';
    const token = localStorage.getItem('token');

    let respData = [];

    // Get cloudevents using Bearer token
    (async () => {
      setLoading(true);

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
      } else {
        setData(respData);
      }

      setLoading(false);
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} loading={loading} />;
};

export default ReturnsPage;
