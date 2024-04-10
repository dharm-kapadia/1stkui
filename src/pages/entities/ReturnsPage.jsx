import { Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';

const columns = [
  { field: 'returnId', headerName: 'Return Id', width: 175, headerAlign: 'center' },
  { field: 'contractId', headerName: 'Contract Id', width: 175, headerAlign: 'center' },
  { field: 'quantity', headerName: 'Quantity', width: 150, headerAlign: 'center' },
  { field: 'returnDate', headerName: 'Return Date', width: 175, headerAlign: 'center' },
  { field: 'status', headerName: 'Status', width: 150, headerAlign: 'center' },
  { field: 'partyId', headerName: 'Party Id', width: 175, headerAlign: 'center' },
  { field: 'returnType', headerName: 'Return Type', width: 175, headerAlign: 'center' },
  { field: 'venueName', headerName: 'Venue Name', width: 150, headerAlign: 'center' },
  { field: 'venueRefKey', headerName: 'Venue Ref Key', width: 170, headerAlign: 'center' },
  { field: 'transactionDatetime', headerName: 'Transaction Datetime', width: 175, headerAlign: 'center' },
  { field: 'partyRole', headerName: 'Party Role', width: 175, headerAlign: 'center' },
  { field: 'venueRefPartyKey', headerName: 'Venue Ref Party Key', width: 175, headerAlign: 'center' },
  { field: 'localVenueFieldName', headerName: 'Local Venue Field Name', width: 175, headerAlign: 'center' },
  { field: 'localVenueFieldValue', headerName: 'Local Venue Field Value', width: 175, headerAlign: 'center' },
  { field: 'lastUpdateDatetime', headerName: 'Last Update Datetime', width: 175, headerAlign: 'center' }
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
        Returns
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

const ReturnsPage = () => {
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
        }
      }

      setData([]);
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default ReturnsPage;
