import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

import DefaultItem from "/examples/Items/DefaultItem";
import { Divider, Grid, Table, TableBody, TableRow } from "@mui/material";

import moneyFormat from "/utils/moneyFormat";
import { useDataProvider } from "/providers/DataProvider";
import { parseProjectDescription } from "/utils/parseProjectDescription";
import SelectedProcesses from "/components/Tasks/selected-processes";
import Link from "next/link";
import Transactions from "/pagesComponents/pages/account/billing/components/Transactions";
import Transaction from "/pagesComponents/pages/account/billing/components/Transaction";
import Icon from "@mui/material/Icon";
import { useState } from "react";
import Modal from "/components/Modal";
import ModalContent from "./modal/content";



const headers = [
  {
    box: {
      width: "auto",
      py: 1.5,
      px: 1,
      textAlign: "left",
    },
    header: "Nombre",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Rol",
  },
  {
    box: {
      width: "auto",
      py: 1.5,
      pr: 1,
      pl: 3,
      textAlign: "left",
    },
    header: "Apoderado",
  },
];

const borderBottom = {
  borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
    `${borderWidth[1]} solid ${light.main}`,
};

export default function Details() {
  const { project } = useDataProvider();
  const filteredTasks = project.tasks.filter((task) => task.procedure !== null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInovoiceState, setModalInvoiceState] = useState(0);


  const handleModalOpen = (state) =>{
    setIsModalOpen(true);
    setModalInvoiceState(state);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalInvoiceState(0);
  };

  const getInitials = (firstName) => {
    const initials = firstName[0] || "";
    return initials.toUpperCase();
  };
  return (
    <>
      <Grid container ml={2}>
        <Grid item xs={12} md={6} xxl={3} whiteSpace="nowrap">
          <DefaultItem
            color="dark"
            title="Honorarios"
            icon="monetization_on_outlined"
            description={moneyFormat(project.cost)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 0, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Creado"
            icon="date_range"
            description={project.createdAt}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Comienzo"
            icon="date_range"
            description={project.startDate}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          xxl={3}
          mt={{ xxl: 0, md: 3, xs: 3 }}
          whiteSpace="nowrap"
        >
          <DefaultItem
            color="dark"
            title="Fin"
            icon="date_range"
            description={project.deadline ?? "Sin Fecha de Fin"}
          />
        </Grid>
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pt={3}
          px={2}
        >
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            Balance del proyecto
          </MDTypography>
        </MDBox>
        <MDBox pt={3} pb={2} px={2}>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            <Transaction
              color="error"
              icon="remove"
              name="Deuda del cliente sin facturar"
              description="27 March 2020, at 12:30 PM"
              value={`${moneyFormat(project.notBilledCost)}`}
            />
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            <Transaction
              color="dark"
              icon="receipt"
              name="Deuda del cliente facturada"
              description="26 March 2020, at 13:45 PM"
              value={`${moneyFormat(project.totalBilledCost)}`}
            />
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
              <MDBox
                onClick = {() => (handleModalOpen(2))}
              >{isModalOpen &&(
                  <Modal
                    height="60%"
                    open={open}
                    onClose={handleCloseModal}
                >
                  <ModalContent state={modalInovoiceState} />
                </Modal>
                )}
                <Transaction
                  
                  color="dark"
                  icon="account_balance"
                  name="Total pago del cliente"
                  description="26 March 2020, at 13:45 PM"
                  value={`${moneyFormat(project.totalPaid)}`}
                />
            </MDBox>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
            sx={{ listStyle: "none" }}
          >
            <MDBox
               onClick = {() => (handleModalOpen(1))}
            >{isModalOpen &&(
              <Modal
                height="60%"
                open={open}
                onClose={handleCloseModal}
            >
              <ModalContent state={modalInovoiceState} />
            </Modal>
            )}
              <Transaction
                color={
                  project.totalPaid -
                    (project.totalBilledCost + project.notBilledCost) >=
                  0
                    ? "success"
                    : "error"
                }
                icon="attach_money"
                name="Deuda total"
                description="26 March 2020, at 13:45 PM"
                value={`${moneyFormat(
                  project.totalPaid -
                    (project.totalBilledCost + project.notBilledCost)
                )}`}
              />
            </MDBox>
          </MDBox>
        </MDBox>
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container mt={3} xs={12} display="flex" justifyContent="center">
        <SelectedProcesses
          selectedProcesses={project.selectedProcesses}
          tasks={filteredTasks}
        />
      </Grid>

      <Divider variant="left" sx={{ width: "100%" }} />

      <Grid container>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Cliente Facturable"
            description={project.billablePartner?.mergedName}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo De Facturación"
            description={
              project.billingType?.label ?? "Sin Tipo de Facturación"
            }
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Horas Estimadas"
            description={project.estimatedHours ?? "Sin estimación"}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Juzgado"
            description={project.court?.description}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Horas Estimadas"
            description={project.estimatedHours ?? "Sin estimación"}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Departamento"
            description={project.serviceType?.label}
          />
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />

        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Proceso"
            description={project.process?.name || "Sin proceso asociado"}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Tipo de caso"
            description={project.type || "Sin tipo de caso"}
          />
        </Grid>
        <Divider variant="left" sx={{ width: "70%" }} />
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Persona responsable"
            description={project.responsiblePerson?.name ?? "Sin responsable"}
          />
        </Grid>
        <Grid xs={12} md={6} mt={3}>
          <DefaultItem
            color="dark"
            title="Propuesta"
            description={project.proposal?.subject || "Sin propuesta asociada"}
          />
        </Grid>
        <Divider variant="left" sx={{ width: "70%" }} />
        {parseProjectDescription(project.description) && (
          <>
            <Grid xs={12} sm={6} mt={3}>
              <MDBox ml={2} mt={0.5} lineHeight={1.4}>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                >
                  Descripción
                </MDTypography>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  dangerouslySetInnerHTML={{
                    __html:
                      parseProjectDescription(project.description) ??
                      "Sin descripción",
                  }}
                />
              </MDBox>
            </Grid>
            <Divider variant="left" sx={{ width: "70%" }} />
          </>
        )}
        <Grid xs={12} pl={2} mt={3}>
          <MDBox mt={0.5} lineHeight={1.4}>
            <MDTypography
              display="block"
              variant="button"
              fontWeight="medium"
              mb={2}
            >
              Miembros Del Caso
            </MDTypography>
          </MDBox>
          {project.members.map((member) => {
            const isExternalUrl =
              member.profileImage &&
              (member.profileImage.startsWith("http://") ||
                member.profileImage.startsWith("https://"));

            return (
              <MDBox
                key={member.id}
                display="flex"
                alignItems="center"
                mb={2}
                mr={2}
              >
                <MDAvatar
                  src={
                    isExternalUrl
                      ? member.profileImage
                      : member.profileImage
                      ? `/images/staff/${member.profileImage}`
                      : undefined
                  }
                  alt={member.name}
                  size="md"
                  shadow="sm"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      !member.profileImage && !isExternalUrl
                        ? "grey.400"
                        : undefined,
                    color:
                      !member.profileImage && !isExternalUrl
                        ? "white"
                        : undefined,
                    textAlign: "center",
                    lineHeight: "initial",
                    marginRight: "0.5rem",
                    fontSize: "25px",
                  }}
                >
                  {!isExternalUrl &&
                    !member.profileImage &&
                    getInitials(member.name)}
                </MDAvatar>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                >
                  {member.name}
                </MDTypography>
              </MDBox>
            );
          })}
        </Grid>

        <Divider variant="left" sx={{ width: "70%" }} />
        {project.partners?.length > 0 && (
          <Grid xs={12} pl={2} mt={3}>
            <MDBox mt={0.5} lineHeight={1.4}>
              <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                mb={2}
              >
                Personas relacionadas
              </MDTypography>
            </MDBox>

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
                        <MDTypography
                          variant="button"
                          color="text"
                          fontWeight="medium"
                        >
                          {header}
                        </MDTypography>
                      </MDBox>
                    ))}
                  </TableRow>
                </MDBox>
                <TableBody>
                  {project.partners?.map((partner) => (
                    <TableRow key={partner.id}>
                      <MDBox
                        component="td"
                        textAlign="left"
                        py={1}
                        pr={1}
                        sx={borderBottom}
                      >
                        <Link href={`/partners/${partner.id}/profile`}>
                          <MDTypography
                            variant="body2"
                            color="info"
                            fontWeight="regular"
                          >
                            {partner.mergedName}
                          </MDTypography>
                        </Link>
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
                          {partner.role?.label}
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
                        <Link href={`/partners/${partner.owner?.id}/profile`}>
                          <MDTypography
                            variant="body2"
                            color="info"
                            fontWeight="regular"
                          >
                            {partner.owner?.company || partner.owner?.name}
                          </MDTypography>
                        </Link>
                      </MDBox>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </>
  );
}
