import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { format } from "date-fns";

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-import
//import useAuth from '../../hooks/useAuth';
import ScrollX from '../../components/ScrollX';
import MainCard from '../../components/MainCard';
import IconButton from '../../components/@extended/IconButton';
import ClassSessionModal from '../../sections/class-session/ClassSessionModal';
import EmptyReactTable from '../../pages/tables/react-table/empty';
import AlertClassSessionDelete from '../../sections/class-session/AlertClassSessionDelete';

import scheduleClassList from '../../data/scheduleClass';

import {
  CSVExport,
  DebouncedInput,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  SelectColumnSorting,
  TablePagination
} from '../../components/third-party/react-table';

// assets
import { Add, Magicpen, Edit, Trash } from 'iconsax-react';

export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

// ==============================|| REACT TABLE - LIST ||============================== //

function ReactTable({ data, columns, modalToggler }) {
  const groups = ['Todo', ...new Set(data.map((item) => item.flagCruce))];

  const countGroup = data.map((item) => item.flagCruce);
  const counts = countGroup.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  const [activeTab, setActiveTab] = useState(groups[0]);
  const [sorting, setSorting] = useState([{ id: 'unidadDidactica', desc: false }]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: false
  });

  let headers = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === 'string' ? columns.header : '#',
        // @ts-ignore
        key: columns.accessorKey
      })
  );

  useEffect(() => {
    setColumnFilters(activeTab === 'Todo' ? [] : [{ id: 'flagCruce', value: activeTab }]);
  }, [activeTab]);

  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.5, pb: 0, width: '100%' }}>
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {groups.map((flagCruce, index) => (
            <Tab
              key={index}
              label={flagCruce === true ? 'Cruce' : flagCruce === false ? 'Sin cruce' : 'Todo'}
              value={flagCruce}
              icon={
                <Chip
                  label={
                    flagCruce === 'Todo'
                      ? data.length
                      : flagCruce === true
                        ? counts.true
                        : counts.false
                  }
                  color={
                    flagCruce === 'Todo'
                      ? 'primary'
                      : flagCruce === true
                        ? 'error'
                        : 'success'
          
                  }
                  variant="light"
                  size="small"
                />
              }
              iconPosition="end"
            />
          ))}
        </Tabs>
      </Box>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: 3 }}>
        <DebouncedInput
          value={globalFilter ?? ''}
          onFilterChange={(value) => setGlobalFilter(String(value))}
          placeholder={`Buscar en ${data.length} registros...`}
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          <Button variant="contained" startIcon={<Add />} onClick={modalToggler} size="large">
            Manual
          </Button>
          <Button variant="contained" startIcon={<Magicpen />} onClick={modalToggler} size="large">
            Automática
          </Button>
          <CSVExport
            {...{ data: table.getSelectedRowModel().flatRows.map((row) => row.original), headers, filename: 'classSessions-list.csv' }}
          />
        </Stack>
      </Stack>
      <ScrollX>
        <Stack>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                        Object.assign(header.column.columnDef.meta, {
                          className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                        });
                      }

                      return (
                        <TableCell
                          key={header.id}
                          {...header.column.columnDef.meta}
                          onClick={header.column.getToggleSortingHandler()}
                          {...(header.column.getCanSort() &&
                            header.column.columnDef.meta === undefined && {
                              className: 'cursor-pointer prevent-select'
                            })}
                        >
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} />}
                            </Stack>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount,
                  initialPageSize: 10
                }}
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| INVOICE - LIST ||============================== //

export default function ClassSessionList() {
  //const { user } = useAuth();

  const { scheduleClassLoading: loading, scheduleClass: list } = scheduleClassList;

  const [open, setOpen] = useState(false);

  const [classSessionModal, setClassSessionModal] = useState(false);
  const [selectedClassSession, setSelectedClassSession] = useState(null);
  const [classSessionDeleteId, setClassSessionDeleteId] = useState('');

  const handleClose = () => {
    setOpen(!open);
  };

  const columns = useMemo(
    () => [
      {
        id: 'Row Selection',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      {
        header: 'Id',
        accessorKey: 'id',
        meta: { className: 'cell-center' }
      },
      {
        header: 'Sede',
        accessorKey: 'sede',
      },
      {
        header: 'Periodo',
        accessorKey: 'PeriodoClases',
      },
      {
        header: 'Unidad Didactica',
        accessorKey: 'unidadDidactica',
      },
      {
        header: 'Sección',
        accessorKey: 'seccion',
      },
      {
        header: 'Periodo Academico',
        accessorKey: 'periodoAcademico',
      },
      {
        header: 'Turno',
        accessorKey: 'turno',
      },
      {
        header: 'ProgramaEstudios',
        accessorKey: 'programaEstudios',
      },
      {
        header: 'Docente',
        accessorKey: 'docente',
      },
      {
        header: 'Aula',
        accessorKey: 'aula',
      },
      {
        header: 'Día',
        accessorKey: 'dia',
      },
      {
        header: 'Inicio',
        accessorKey: 'start',
        cell: ({ row }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              { row.original.start ?
              <Typography color="text.secondary">{format(new Date(row.original.start), "HH:mm")}</Typography>
              : <Typography color="text.secondary">Sin fecha</Typography>
              }
            </Stack>
          </Stack>
        )
      },
      {
        header: 'Fin',
        accessorKey: 'end',
        cell: ({ row }) => (
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Stack spacing={0}>
              { row.original.end ?
              <Typography color="text.secondary">{format(new Date(row.original.end), "HH:mm")}</Typography>
              : <Typography color="text.secondary">Sin fecha</Typography>
              }
            </Stack>
          </Stack>
        )
      },
      {
        header: 'Cruce',
        accessorKey: 'flagCruce',
        cell: (cell) => {
          switch (cell.getValue()) {
            case true:
              return <Chip color="error" label="Cruce" size="small" variant="light" />;
            case false:
              return <Chip color="success" label="Sin cruce" size="small" variant="light" />;
            default:
              return <Chip color="info" label="Sin Dato" size="small" variant="light" />;
          }
        }
      },
      {
        header: 'Acciones',
        meta: { className: 'cell-center' },
        disableSortBy: true,
        cell: ({ row }) => {
          return (
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
              <Tooltip title="Editar">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedClassSession(row.original);
                    setClassSessionModal(true);
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
                <IconButton
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                    setClassSessionDeleteId(Number(row.original.id));
                  }}
                >
                  <Trash />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
      }
    ], // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container direction={matchDownSM ? 'column' : 'row'} spacing={2} sx={{ pb: 2 }}>
        <Grid item xs={12}>
          {loading ? (
            <EmptyReactTable />
          ) : (
            <ReactTable
              {...{
                data: list,
                columns,
                modalToggler: () => {
                  setClassSessionModal(true);
                  setSelectedClassSession(null);
                }
              }}
            />
          )}
          <AlertClassSessionDelete id={Number(classSessionDeleteId)} aulaId={classSessionDeleteId.toString()} open={open} handleClose={handleClose} />
          <ClassSessionModal open={classSessionModal} modalToggler={setClassSessionModal} classSession={selectedClassSession} />
        </Grid>
      </Grid>
    </>
  );
}

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array };
