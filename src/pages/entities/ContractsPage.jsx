import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { CSVExport, EmptyTable, Filter } from 'components/third-party/react-table';
import makeContractData from 'data/contracts-table';

import { getContracts } from '../../services/contracts';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Get cloudevents using Bearer token
    const resp = getContracts(token);
    console.log(resp);
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter
  });

  return (
    <MainCard content={false}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="right" sx={{ padding: 2 }}>
        <CSVExport data={data} filename={'empty-table.csv'} />
      </Stack>

      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={table.getAllColumns().length}>
                    <EmptyTable msg="No Data" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - EMPTY ||============================== //

const ContractsPage = () => {
  const data = useMemo(() => makeContractData(0), []);

  const columns = useMemo(
    () => [
      {
        header: 'Contract ID',
        accessorKey: 'contractId'
      },
      {
        header: 'Processing Status',
        accessorKey: 'processingStatus'
      },
      {
        header: 'Matching Spire Position Id',
        accessorKey: 'matchingSpirePositionId',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Contract Status',
        accessorKey: 'contractStatus'
      },
      {
        header: 'Last Update Party',
        accessorKey: 'lastUpdateParty'
      },
      {
        header: 'Last Update Date/Time',
        accessorKey: 'lastUpdateDateTime'
      },
      {
        header: 'Venue Ref Key',
        accessorKey: 'venueRefKey',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'CUSIP',
        accessorKey: 'cusip'
      },
      {
        header: 'ISIN',
        accessorKey: 'isin'
      },
      {
        header: 'SEDOL',
        accessorKey: 'sedol'
      },
      {
        header: 'Ticker',
        accessorKey: 'ticker'
      },
      {
        header: 'Trade Date',
        accessorKey: 'tradeDate'
      },
      {
        header: 'Settlement Date',
        accessorKey: 'settlementDate'
      },
      {
        header: 'Collateral Type',
        accessorKey: 'collateralType'
      },
      {
        header: 'Collateral Currency',
        accessorKey: 'ccurrency'
      },
      {
        header: 'Internal Party Id',
        accessorKey: 'internalPartyId'
      },
      {
        header: 'Account Id',
        accessorKey: 'accountId'
      },
      {
        header: 'Interal Ref Id',
        accessorKey: 'internalRefId'
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data} />;
};

export default ContractsPage;
