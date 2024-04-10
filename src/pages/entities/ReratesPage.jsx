import { Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';

const columns = [
  { field: 'rerateId', headerName: 'Rerate Id', width: 175 },
  { field: 'contractId', headerName: 'Contract Id', width: 175 },
  { field: 'rerateStatus', headerName: 'Rerate Status', width: 175 },
  { field: 'processingStatus', headerName: 'Processing Status', width: 175 },
  { field: 'matchingSpireTradeId', headerName: 'Matching Spire Trade Id', width: 175 },
  { field: 'relatedSpireTradeId', headerName: 'Related Spire Trade Id', width: 175 },
  { field: 'createDatetime', headerName: 'Create Datetime', width: 175 },
  { field: 'lastUpdateDatetime', headerName: 'Last Update Datetime', width: 175 }
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
        Rerates
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

const ReratesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/rerates';
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

          setData(respData);
        }
      } else {
        setData([]);
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default ReratesPage;
