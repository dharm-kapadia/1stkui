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
import { EmptyTable, Filter } from 'components/third-party/react-table';

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

// ==============================|| REACT TABLE - EMPTY ||============================== //

const SplitsPage = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Contract Split Id',
        accessorKey: 'contractSplitId',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: 'Status',
        accessorKey: 'contractSplitStatus'
      },
      {
        header: 'Split Lots',
        accessorKey: 'splitLots'
      },
      {
        header: 'Last Update Datetime',
        accessorKey: 'lastUpdateDatetime'
      }
    ],
    []
  );

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';
    const token = localStorage.getItem('token');

    let respData = [];

    // Get Splits using Bearer token
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

      // Todo: set data from Splits Toolkit API
      setData([]);
    })();
  }, []);

  return <ReactTable columns={columns} data={data} />;
};

export default SplitsPage;
