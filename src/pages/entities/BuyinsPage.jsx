import axios from 'axios';
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

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

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
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="left" sx={{ padding: 2 }}>
        <CSVExport data={data} filename={'buyins.csv'} />
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

const BuyinsPage = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'buyinInitiatedId',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: 'Buy-In Date',
        accessorKey: 'buyinDate'
      },
      {
        header: 'Contract Id',
        accessorKey: 'contractId'
      },
      {
        header: 'Status',
        accessorKey: 'status'
      },
      {
        header: 'Open Quantity',
        accessorKey: 'openQuantity'
      },
      {
        header: 'Quantity',
        accessorKey: 'quantity'
      },
      {
        header: 'Buy-In Initiated Last Update DateTime',
        accessorKey: 'buyinInitiateILastUpdateDatetime'
      },
      {
        header: 'Buy-In Complete Id',
        accessorKey: 'buyinCompleteId'
      },
      {
        header: 'Value',
        accessorKey: 'value'
      },
      {
        header: 'Currency',
        accessorKey: 'currency'
      },
      {
        header: 'Unit',
        accessorKey: 'unit'
      },
      {
        header: 'Value Date',
        accessorKey: 'valueDate'
      },
      {
        header: 'Buy-In Completed Last Update Datetime',
        accessorKey: 'buyinCompleteLastUpdateDatetime'
      }
    ],
    []
  );

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/contracts';
    const token = localStorage.getItem('token');

    // Get cloudevents using Bearer token
    (async () => {
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (result.data.totalItems !== 0) {
        setData(result.data.items);
      }
    })();
  }, []);

  return <ReactTable columns={columns} data={data} />;
};

export default BuyinsPage;
