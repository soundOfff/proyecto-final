"use client";

import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { getTableFields } from "/actions/table-field";
import { useEffect, useState } from "react";
import { EditorState, SelectionState } from "draft-js";
import { htmlToEditorState } from "/utils/parseEditorState";

export default function FieldList({
  mailTemplate,
  editorState,
  setEditorState,
}) {
  const [fields, setFields] = useState([]);

  const handleSlugClick = (e) => {
    e.preventDefault();
    const slug = e.target.textContent;
    const currentSelection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent().getPlainText();
    const focusOffset = currentSelection.getFocusOffset();

    const newText =
      currentContent.slice(0, focusOffset) +
      slug +
      currentContent.slice(focusOffset);

    const newEditorState = htmlToEditorState(newText);
    const newFocusOffset = focusOffset + slug.length;

    let lastBlockKey;
    const newContentState = newEditorState.getCurrentContent();
    const blockMap = newContentState.getBlockMap();

    blockMap.forEach((contentBlock) => {
      lastBlockKey = contentBlock.getKey();
    });

    const newSelection = new SelectionState({
      anchorKey: lastBlockKey,
      anchorOffset: newFocusOffset,
      focusKey: lastBlockKey,
      focusOffset: newFocusOffset,
      hasFocus: true,
    });

    setEditorState(EditorState.forceSelection(newEditorState, newSelection));
  };

  const renderRow = (field, index) => (
    <MDBox key={index} component="li" mb={1}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
      >
        <MDTypography
          variant="button"
          fontWeight="medium"
          color="text"
          gutterBottom
        >
          {field.field}
        </MDTypography>
        <MDTypography
          variant="button"
          sx={{ color: "#008ece", cursor: "pointer" }}
          fontWeight="medium"
          textTransform="lowercase"
          onMouseDown={handleSlugClick}
        >
          {`{${field.field}}`}
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  const renderFieldList = () => {
    return [mailTemplate.group.name].map(
      (
        fieldGroup,
        index // TODO: Get the correct data
      ) => (
        <Grid key={index} xs={12} sm={6}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            bgColor="grey-100"
            sx={{ border: "1px solid #e0e0e0" }}
            p={1}
            mb={2}
          >
            <MDBox display="flex" gap={2} pl={4} flexDirection="column">
              <MDTypography variant="body4" color="text" fontWeight="bold">
                {mailTemplate.group.name}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            key={index}
            flexDirection="column"
            px={2}
            m={1}
            gap={1}
            sx={{ listStyle: "none" }}
          >
            {fields.map((field, index) => {
              return renderRow(field, index);
            })}
          </MDBox>
        </Grid>
      )
    );
  };

  useEffect(() => {
    getTableFields({ table: mailTemplate.group.slug }).then((fields) => {
      setFields(fields);
    });
  }, [mailTemplate]);

  return (
    fields && (
      <Card sx={{ width: "100%" }}>
        <MDBox pl={4} pr={2} py={4}>
          <MDTypography variant="h5">
            Campos combinados disponibles
          </MDTypography>
          <Divider />
          <Grid container spacing={2}>
            {renderFieldList()}
          </Grid>
        </MDBox>
      </Card>
    )
  );
}
