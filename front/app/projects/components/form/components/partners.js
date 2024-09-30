"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "./tabs";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { useEffect, useState } from "react";
import PartnerForm from "./partnerForm";
import PartnerList from "./partnerList";
import { parseEditorState } from "/utils/parseEditorState";
import { convertToRaw } from "draft-js";
import Description from "./description";
import NoteForm from "./noteForm";
import NoteList from "./noteList";
import Modal from "/components/Modal";

export default function Partners({
  partnerData,
  project,
  roles,
  partners,
  partnerList,
  setFieldValue,
  values,
  description,
  notes,
}) {
  const [tab, setTab] = useState("partners");
  const [descriptionEditorState, setDescriptionEditorState] = useState(
    parseEditorState(project?.description || "")
  );
  const [ownerConfirmationModal, setPartnerConfirmationModal] = useState(false);

  const handleOpenConfirmationModal = (value) => {
    if (!value) return;
    console.log(value);
    setPartnerConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setPartnerConfirmationModal(false);
  };

  useEffect(() => {
    const raw = convertToRaw(descriptionEditorState.getCurrentContent());
    const strDescription = JSON.stringify(raw);

    setFieldValue(description.name, strDescription);
  }, [descriptionEditorState, setFieldValue, description]);

  return (
    <MDBox>
      <Modal
        open={ownerConfirmationModal}
        onClose={handleCloseConfirmationModal}
        width="40%"
      >
        <MDTypography variant="body2" align="center">
          ¿Estás seguro de que deseas agregar al apoderado?
        </MDTypography>
      </Modal>
      <TabContext value={tab}>
        <MDBox mt={2}>
          <Tabs setTabIndex={setTab} />
        </MDBox>
        <TabPanel value="partners">
          <PartnerForm
            {...{ values, setFieldValue, partnerData, roles }}
            openConfirmationModal={handleOpenConfirmationModal}
          />
          <PartnerList
            rows={partnerList}
            setFieldValue={setFieldValue}
            partnerField={partners}
            values={values}
          />
        </TabPanel>
        <TabPanel value="description">
          <Description
            {...{
              description,
              descriptionEditorState,
              setDescriptionEditorState,
            }}
          />
        </TabPanel>
        <TabPanel value="notes">
          <NoteForm {...{ notes, setFieldValue, values }} />
          <NoteList {...{ notes, setFieldValue, values }} />
        </TabPanel>
      </TabContext>
    </MDBox>
  );
}
