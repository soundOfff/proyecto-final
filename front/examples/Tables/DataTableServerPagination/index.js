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

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";

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

// NextJS Material Dashboard 2 PRO examples
import DataTableHeadCell from "/examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "/examples/Tables/DataTable/DataTableBodyCell";
import ResponsiveTableContent from "/app/projects/components/responsive-table-content";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function DataTable({
  canSearch = false,
  showTotalEntries = true,
  table = [],
  pagination = { variant: "gradient", color: "dark" },
  noEndBorder = false,
  className = "desktop",
  meta = null,
}) {
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    tableInstance;

  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const entries = ["5", "10", "15", "20", "25", "50", "100"];
  const pageSize = 4;
  const [pages, setPages] = useState([]);

  useEffect(() => {
    let pagination = Array.from({ length: meta.last_page }, (v, i) => i);
    if (meta.current_page < pageSize) {
      pagination = pagination.slice(0, pageSize * 2);
    } else if (meta.current_page + pageSize > meta.last_page) {
      pagination = pagination.slice(
        meta.current_page - pageSize * 2,
        meta.last_page
      );
    } else {
      pagination = pagination.slice(
        meta.current_page - pageSize,
        meta.current_page + pageSize - 1
      );
    }
    setPages(pagination);
  }, [meta.current_page, meta.last_page]);

  const nextPage = () => {
    setCurrentPage(meta.current_page + 1);
  };

  const previousPage = () => {
    setCurrentPage(meta.current_page - 1);
  };

  const canPreviousPage = () => meta.current_page > 1;

  const setCurrentPage = (page) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page);

    replace(`${pathname}?${params.toString()}`);
  };

  const setPerPage = (perPage) => {
    const params = new URLSearchParams(searchParams);

    params.set("perPage", perPage);
    params.set("page", 1);

    replace(`${pathname}?${params.toString()}`);
  };

  const renderPagination = pages.map((option) => (
    <MDPagination
      item
      key={option.toString()}
      onClick={() => setCurrentPage(Number(option) + 1)}
      active={meta.current_page - 1 === option}
    >
      {option + 1}
    </MDPagination>
  ));

  return (
    <TableContainer sx={{ boxShadow: "none" }} className={className}>
      {entries || canSearch ? (
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
        >
          {entries && (
            <MDBox display="flex" alignItems="center">
              <Autocomplete
                disableClearable
                value={meta.per_page.toString()}
                options={entries}
                onChange={(event, newValue) => {
                  setPerPage(parseInt(newValue, 10));
                }}
                size="small"
                sx={{ width: "5rem" }}
                renderInput={(params) => <MDInput {...params} />}
              />
              <MDTypography variant="caption" color="secondary" ml={2}>
                filas por página
              </MDTypography>
            </MDBox>
          )}
        </MDBox>
      ) : null}
      <Table {...getTableProps()}>
        <MDBox
          component="thead"
          sx={{ display: { md: "table-header-group", xs: "none" } }}
        >
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => (
                <DataTableHeadCell
                  key={key}
                  {...column.getHeaderProps()}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </MDBox>
        <TableBody
          {...getTableBodyProps()}
          sx={{ display: { md: "table-row-group", xs: "none" } }}
        >
          {rows.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <DataTableBodyCell
                    key={key}
                    noBorder={noEndBorder && rows.length - 1 === key}
                    align={cell.column.align ? cell.column.align : "left"}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableBody
          {...getTableBodyProps()}
          sx={{ display: { md: "none", xs: "table-row-group" } }}
        >
          {rows.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                <DataTableBodyCell
                  key={key}
                  noBorder={noEndBorder && rows.length - 1 === key}
                  {...row.cells[0].getCellProps()}
                >
                  <ResponsiveTableContent row={row} />
                </DataTableBodyCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <MDBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-around"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        <MDBox mb={{ xs: 3, sm: 0 }}>
          <MDTypography variant="button" color="secondary" fontWeight="regular">
            Mostrando desde {meta.from} a {meta.to} de un total de {meta.total}{" "}
            filas
          </MDTypography>
        </MDBox>
        <MDPagination
          variant={pagination.variant ? pagination.variant : "gradient"}
          color={pagination.color ? pagination.color : "dark"}
        >
          {canPreviousPage && (
            <MDPagination item onClick={() => previousPage()}>
              <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
            </MDPagination>
          )}
          {renderPagination}
          <MDPagination item onClick={() => nextPage()}>
            <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
          </MDPagination>
        </MDPagination>
      </MDBox>
    </TableContainer>
  );
}

export default DataTable;
