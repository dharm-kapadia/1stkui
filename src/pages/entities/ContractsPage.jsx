import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

// material-ui
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable, Filter } from 'components/third-party/react-table';

import { flattenContracts } from 'utils/jsonHelper';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination
  });

  return (
    <>
      <MainCard content={false}>
        <ScrollX className="pb-2 table-responsive">
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
      <div className="pt-2">
        <Button
          variant="contained"
          startIcon={<KeyboardArrowLeftIcon />}
          color="success"
          size="small"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        />
        <Button
          variant="contained"
          startIcon={<KeyboardDoubleArrowLeftIcon />}
          color="success"
          size="small"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        />
        <Button
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          color="success"
          size="small"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        />
        <Button
          variant="contained"
          endIcon={<KeyboardDoubleArrowRightIcon />}
          color="success"
          size="small"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        />
        <div className="flex float-end">
          Page:
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
        </div>
      </div>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

const EventsPage = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Contract Id',
        accessorKey: 'contractId',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: 'Status',
        accessorKey: 'contractStatus'
      },
      {
        header: 'Create DateTime',
        accessorKey: 'createDateTime'
      },
      {
        header: 'Last Update DateTime',
        accessorKey: 'lastUpdateDateTime'
      },
      {
        header: 'Matching Spire Position Id',
        accessorKey: 'matchingSpirePositionId'
      },
      {
        header: 'Matching Spire Trade Id',
        accessorKey: 'matchingSpireTradeId'
      },
      {
        header: 'Processing Status',
        accessorKey: 'processingStatus'
      },
      {
        header: 'Billing Currency',
        accessorKey: 'billingCurrency'
      },
      {
        header: 'Venue Ref Id',
        accessorKey: 'venueRefId'
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
        accessorKey: 'collateralCurrency'
      },
      {
        header: 'Internal Party Id',
        accessorKey: 'internalPartyId'
      },
      {
        header: 'Account Id',
        accessorKey: 'accountId'
      }
    ],
    []
  );

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';
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

        let vals = flattenContracts(respData);
        setData(vals);
      }
    })();
  }, []);

  return <ReactTable columns={columns} data={data} />;
};

export default EventsPage;
