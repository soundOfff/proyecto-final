"use client";

import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { EditorState, SelectionState } from "draft-js";
import { htmlToEditorState } from "/utils/parseEditorState";
import FieldListItem from "./field-list-item";

export default function FieldList({
  editorState,
  setEditorState,
  allowedFields,
}) {
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

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox pl={4} pr={2} py={4}>
        <MDTypography variant="h5">Campos combinados disponibles</MDTypography>
        <Divider />
        <Grid container spacing={2}>
          {allowedFields.length > 0 ? (
            <>
              {allowedFields.map((field, index) => {
                return (
                  <FieldListItem
                    key={index}
                    name={Object.keys(field)[0]}
                    fields={Object.values(field)[0]}
                    handleSlugClick={handleSlugClick}
                  />
                );
              })}
            </>
          ) : (
            <MDBox p={2}>
              <MDTypography
                variant="body2"
                color="text"
                fontWeight="regular"
                mx="auto"
              >
                No hay campos disponibles
              </MDTypography>
            </MDBox>
          )}
        </Grid>
      </MDBox>
    </Card>
  );
}
