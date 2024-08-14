/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
"use client";

import { useMemo, useEffect, useState, forwardRef, useRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useRowSelect,
} from "react-table";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// regenerator-runtime
import "regenerator-runtime/runtime.js";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDPagination from "/components/MDPagination";

import DataTableHeadCell from "/examples/Tables/components/DataTableHeadCell";
import DataTableBodyCell from "/examples/Tables/components/DataTableBodyCell";
import ResponsiveTableContent from "/examples/Tables/components/responsive-table-content";
import DataTableRow from "../components/DataTableRow";
import withScrolling from "react-dnd-scrolling";
import { Checkbox } from "@mui/material";

const ScrollingComponent = withScrolling("div");

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <Checkbox ref={resolvedRef} {...rest} />;
});

IndeterminateCheckbox.displayName = "IndeterminateCheckbox";

function DataTable({
  entriesPerPage = { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  canSearch = false,
  showTotalEntries = true,
  table = [],
  pagination = { variant: "gradient", color: "dark" },
  isSorted = true,
  isTaskTable = false,
  noEndBorder = false,
  className = "desktop",
  moveRow,
  canMultiSelect = false,
  setDeleteIds,
}) {
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["5", "10", "15", "20", "25"];
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: canMultiSelect ? [] : ["selection"],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  const prevSelectedFlatRowsRef = useRef();

  useEffect(() => {
    const prevSelectedFlatRows = prevSelectedFlatRowsRef.current;
    const selectedIds = selectedFlatRows.map((row) => row.original.id);

    if (
      setDeleteIds &&
      (!prevSelectedFlatRows ||
        selectedIds.toString() !== prevSelectedFlatRows.toString())
    ) {
      setDeleteIds(selectedIds);
    }

    prevSelectedFlatRowsRef.current = selectedIds;
  }, [selectedFlatRows, setDeleteIds]);

  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue, setPageSize]);

  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart =
    pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }} className={className}>
      {entriesPerPage || canSearch ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {entriesPerPage && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={pageSize.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setEntriesPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      style: { textTransform: "uppercase" },
                    }}
                  />
                )}
              />
              <MDTypography variant="caption" color="secondary">
                &nbsp;&nbsp;entradas por página
              </MDTypography>
            </MDBox>
          )}
          {canSearch && (
            <MDBox width="12rem" ml="auto">
              <MDInput
                placeholder="Search..."
                value={search}
                size="small"
                fullWidth
                onChange={({ currentTarget }) => {
                  setSearch(search);
                  onSearchChange(currentTarget.value);
                }}
              />
            </MDBox>
          )}
        </MDBox>
      ) : null}

      <DndProvider backend={HTML5Backend}>
        <ScrollingComponent
          style={{
            overflowY: "auto",
            height: moveRow ? "70vh" : "100%",
          }}
        >
          <Table {...getTableProps()}>
            <MDBox
              component="thead"
              sx={{ display: { lg: "table-header-group", xs: "none" } }}
            >
              {headerGroups.map((headerGroup, key) => (
                <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, key) => (
                    <DataTableHeadCell
                      key={key}
                      {...column.getHeaderProps(
                        isSorted && column.getSortByToggleProps()
                      )}
                      width={column.width ? column.width : "auto"}
                      align={column.align ? column.align : "left"}
                      isSortDisabled={column.disableSortBy}
                      sorted={setSortedValue(column)}
                    >
                      {column.render("Header")}
                    </DataTableHeadCell>
                  ))}
                  {moveRow && <DataTableHeadCell width="10px" />}
                </TableRow>
              ))}
            </MDBox>
            <TableBody
              {...getTableBodyProps()}
              sx={{
                display: { lg: "table-row-group", xs: "none" },
              }}
            >
              {page.map((row, index) => {
                return (
                  <DataTableRow
                    key={index}
                    index={index}
                    row={row}
                    rows={page}
                    noEndBorder={noEndBorder}
                    isTaskTable={isTaskTable}
                    moveRow={moveRow}
                  />
                );
              })}
            </TableBody>
            <TableBody
              {...getTableBodyProps()}
              sx={{ display: { lg: "none", xs: "table-row-group" } }}
            >
              {page.map((row, key) => {
                return (
                  prepareRow(row) || (
                    <TableRow key={key} {...row.getRowProps()}>
                      <DataTableBodyCell
                        key={key}
                        noBorder={noEndBorder && page.length - 1 === key}
                        {...row.cells[0].getCellProps()}
                        sx={{ textTransform: "uppercase" }}
                      >
                        <ResponsiveTableContent row={row} />
                      </DataTableBodyCell>
                    </TableRow>
                  )
                );
              })}
            </TableBody>
          </Table>
        </ScrollingComponent>
      </DndProvider>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <MDBox mb={{ xs: 3, sm: 0 }}>
            <MDTypography
              variant="button"
              color="secondary"
              fontWeight="regular"
            >
              Mostrando {entriesStart} a {entriesEnd} de {page.length} entradas
            </MDTypography>
          </MDBox>
        )}
        {pageOptions.length > 1 && (
          <MDPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "dark"}
          >
            {canPreviousPage && (
              <MDPagination item onClick={() => previousPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </MDPagination>
            )}
            {renderPagination.length > 6 ? (
              <MDBox width="5rem" mx={1}>
                <MDInput
                  inputProps={{
                    type: "number",
                    min: 1,
                    max: customizedPageOptions.length,
                  }}
                  value={customizedPageOptions[pageIndex]}
                  onChange={(handleInputPagination, handleInputPaginationValue)}
                />
              </MDBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <MDPagination item onClick={() => nextPage()}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </MDPagination>
            )}
          </MDPagination>
        )}
      </MDBox>
    </TableContainer>
  );
}

// Typechecking props for the DataTable
DataTable.propTypes = {
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  class: PropTypes.string,
};

export default DataTable;
