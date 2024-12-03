"use client";

import { Table, TableBody, TableRow } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import TableRowComponent from "./table-row-component";
import { getAll as getAllProjects } from "/actions/projects";
import { useState, useEffect } from "react";
import { generatePartnerBalancePdf } from "/actions/generate-pdf";

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

const headers = [
  {
    box: {
      width: "auto",
      py: 1.5,
      px: 1,
      textAlign: "left",
    },
    header: "Projecto",
  },
  {
    box: {
      width: "auto",
      py: 2,
      pr: 1.5,
      pl: 3,
      textAlign: "left",
    },
    header: "Nombre de Projecto",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1.5,
      pl: 3,
      textAlign: "left",
    },
    header: "Total Pagado",
  },
  {
    box: {
      width: "auto",
      py: 3,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Total Facturado",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Pendiente",
  },
];

export default function ModalContent({ partner }) {
  const [projects, setProjects] = useState([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const { id } = partner;

  const handlePrint = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdfUrl = await generatePartnerBalancePdf(partner.id);
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
    setIsGeneratingPdf(false);
  };

  useEffect(() => {
    getAllProjects({
      "filter[billable_partner_id]": id,
    }).then((data) => {
      setProjects(data.data.projects);
    });
  }, [id]);

  return (
    <MDBox p={5} overflow="auto">
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
          {projects.map((project) => (
            <TableRowComponent key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
      <MDBox display="flex" justifyContent="end" mt={4}>
        <MDButton
          variant="gradient"
          color="dark"
          onClick={handlePrint}
          disabled={isGeneratingPdf}
          sx={{ displayPrint: "none" }}
        >
          {isGeneratingPdf ? (
            "Generando..."
          ) : (
            <MDBox>
              <MDTypography variant="caption" fontWeight="medium" color="light">
                Imprimir Balance
              </MDTypography>
              <DownloadIcon
                color="white"
                sx={{
                  fontSize: "2rem",
                  marginLeft: "0.5rem",
                  verticalAlign: "middle",
                }}
              />
            </MDBox>
          )}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}
