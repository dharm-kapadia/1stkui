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
        <CSVExport data={data} filename={'declined.csv'} />
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

const DeclinedPage = () => {
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        header: 'Decline Instruction Id',
        accessorKey: 'declineInstructionId',
        meta: {
          className: 'cell-left'
        }
      },
      {
        header: 'Related Exception Event ID',
        accessorKey: 'relatedExceptionEventId'
      },
      {
        header: 'Related Proposal Id',
        accessorKey: 'relatedProposalId'
      },
      {
        header: 'Related Proposal Type',
        accessorKey: 'relatedProposalType'
      },
      {
        header: 'Creation Datetime',
        accessorKey: 'creationDateTime'
      },
      {
        header: 'User Id',
        accessorKey: 'userId'
      },
      {
        header: 'Decline Reason Code',
        accessorKey: 'declineReasonCode'
      },
      {
        header: 'Decline Reason Text',
        accessorKey: 'declineReasonText'
      }
    ],
    []
  );

  useEffect(() => {
    const url = process.env.REACT_APP_TOOLKIT_API_URL + '/decline-instructions';
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

export default DeclinedPage;
