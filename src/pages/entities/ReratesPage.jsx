import { IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

import Box from '@mui/material/Box';
import MainCard from 'components/MainCard';
import { mapRerates } from 'utils/jsonHelper';

const columns = [
  { field: 'id', headerName: 'Rerate Id', width: 275, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'contractId', headerName: 'Contract Id', width: 275, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  { field: 'rerateStatus', headerName: 'Rerate Status', width: 200, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'processingStatus',
    headerName: 'Processing Status',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  { field: 'createDatetime', headerName: 'Create Datetime', width: 175, headerAlign: 'center', headerClassName: 'super-app-theme--header' },
  {
    field: 'lastUpdateDatetime',
    headerName: 'Last Update Datetime',
    width: 175,
    headerAlign: 'center',
    headerClassName: 'super-app-theme--header'
  },
  {
    field: 'effectiveDate',
    headerName: 'Effective Date',
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
        <IconButton color="primary" aria-label="Discrepancies" size="medium">
          <CurrencyExchangeOutlinedIcon />
        </IconButton>
        <Typography sx={{ flex: '1 1 100%' }} variant="h3" id="tableTitle" component="div">
          Rerates
        </Typography>
      </Stack>
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
              pagination: { paginationModel: { pageSize: 20 } }
            }}
            pageSizeOptions={[20, 50, 100]}
            rows={rows}
            columns={columns}
          />
        </Box>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};

const ReratesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = localStorage.getItem('url') + '/rerates';
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

        const items = mapRerates(respData);
        setData(items);
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default ReratesPage;
