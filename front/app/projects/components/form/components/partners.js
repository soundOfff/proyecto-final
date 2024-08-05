"use client";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "./tabs";
import MDBox from "/components/MDBox";
import { useEffect, useState } from "react";
import PartnerForm from "./partnerForm";
import PartnerList from "./partnerList";
import Notes from "./notes";
import { parseEditorState } from "/utils/parseEditorState";
import { convertToRaw } from "draft-js";

export default function Partners({
  partnerData,
  project,
  roles,
  partners,
  partnerList,
  setFieldValue,
  values,
  description,
}) {
  const [tab, setTab] = useState("partners");
  const [editorState, setEditorState] = useState(
    parseEditorState(project?.description || "")
  );

  useEffect(() => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const strDescription = JSON.stringify(raw);

    setFieldValue(description.name, strDescription);
  }, [editorState, setFieldValue, description]);
  return (
    <MDBox>
      <TabContext value={tab}>
        <MDBox my={2}>
          <Tabs setTabIndex={setTab} />
        </MDBox>
        <TabPanel value="partners">
          <PartnerForm {...{ values, setFieldValue, partnerData, roles }} />
          <PartnerList
            rows={partnerList}
            setFieldValue={setFieldValue}
            partnerField={partners}
            values={values}
          />
        </TabPanel>
        <TabPanel value="notes">
          <Notes {...{ description, editorState, setEditorState }} />
        </TabPanel>
      </TabContext>
    </MDBox>
  );
}
