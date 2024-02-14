"use client";

import { Table, TableRow, TableBody } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import numberFormat from "/utils/numberFormat";

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

const headers = [
  {
    box: {
      width: { xs: "45%", md: "50%" },
      py: 1.5,
      px: 1,
      textAlign: "left",
    },
    header: "Artículo",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Cantidad",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Precio",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Impuesto",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Importe",
  },
];

export default function TableComponent({ proposal }) {
  return (
    <MDBox p={3} className="table-print">
      <MDBox width="100%" overflow="auto">
        <Table sx={{ minWidth: "32rem" }}>
          <MDBox component="thead">
            <TableRow>
              {headers.map(({ box, header }, index) => (
                <MDBox
                  key={`${index}-headers`}
                  component="th"
                  width={box.width}
                  py={box.py}
                  pl={box.pl}
                  pr={box.pr}
                  textAlign={box.textAlign}
                  sx={borderBottom}
                >
                  <MDTypography variant="h6" color="text" fontWeight="medium">
                    {header}
                  </MDTypography>
                </MDBox>
              ))}
            </TableRow>
          </MDBox>
          <TableBody>
            {proposal.items.map((item) => (
              <TableRow key={item.id}>
                <MDBox
                  component="td"
                  textAlign="left"
                  py={1}
                  pr={1}
                  pl={3}
                  sx={borderBottom}
                >
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                  >
                    {item.description}
                  </MDTypography>
                </MDBox>
                <MDBox
                  component="td"
                  textAlign="left"
                  py={1}
                  pr={1}
                  pl={3}
                  sx={borderBottom}
                >
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                  >
                    {item.quantity}
                  </MDTypography>
                </MDBox>
                <MDBox
                  component="td"
                  textAlign="left"
                  py={1}
                  pr={1}
                  pl={3}
                  sx={borderBottom}
                >
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                  >
                    ${numberFormat(item.rate)}
                  </MDTypography>
                </MDBox>
                <MDBox
                  component="td"
                  textAlign="left"
                  py={1}
                  pr={1}
                  pl={3}
                  sx={borderBottom}
                >
                  {item.taxes.map((tax) => (
                    <MDTypography
                      key={tax.id}
                      variant="body2"
                      color="text"
                      fontWeight="regular"
                    >
                      {tax.name} {tax.rate}
                    </MDTypography>
                  ))}
                </MDBox>
                <MDBox
                  component="td"
                  textAlign="left"
                  py={1}
                  pr={1}
                  pl={3}
                  sx={borderBottom}
                >
                  <MDTypography
                    variant="body2"
                    color="text"
                    fontWeight="regular"
                  >
                    $
                    {numberFormat(
                      item.quantity *
                        item.rate *
                        (1 +
                          item.taxes.reduce(
                            (acc, tax) => acc + Number(tax.rate),
                            0
                          ) /
                            100)
                    )}
                  </MDTypography>
                </MDBox>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MDBox>
    </MDBox>
  );
}
