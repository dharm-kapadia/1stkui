import { Toolbar, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// project import
import MainCard from 'components/MainCard';
import { filterForDiscrepancies } from 'utils/jsonHelper';

const columns = [
  { field: 'contractId', headerName: 'Contract Id', width: 175 },
  { field: 'processingStatus', headerName: 'Processing Status', width: 125 },
  { field: 'matchingSpirePositionId', headerName: 'Matching Spire Position Id', width: 175 },
  { field: 'contractStatus', headerName: 'Contract Status', width: 125 },
  { field: 'lastUpdatePary', headerName: 'Last Update Party', width: 125 },
  { field: 'venueRefKey', headerName: 'Venue Ref Key', width: 125 },
  { field: 'cusip', headerName: 'CUSIP', width: 100 },
  { field: 'isin', headerName: 'ISIN', width: 100 },
  { field: 'sedol', headerName: 'SEDOL', width: 100 },
  { field: 'ticker', headerName: 'Ticker', width: 100 },
  { field: 'tradeDate', headerName: 'Trade Date', width: 125 },
  { field: 'settlementDate', headerName: 'Settlement Date', width: 125 },
  { field: 'collateralType', headerName: 'Collateral Type', width: 125 },
  { field: 'collateralCurrency', headerName: 'Collateral Currency', width: 125 },
  { field: 'internalPartyId', headerName: 'Internal Party Id', width: 125 },
  { field: 'accountId', headerName: 'accountId', width: 125 },
  { field: 'internalRefId', headerName: 'internalRefId', width: 125 }
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
        Trade Agreements
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

const TradeAgreementsPage = () => {
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

          let vals = filterForDiscrepancies(respData);
          setData(vals);
        }
      }
    })();
  }, []);

  return <ReactTable columns={columns} rows={data} />;
};

export default TradeAgreementsPage;
