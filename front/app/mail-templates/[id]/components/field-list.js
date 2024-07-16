"use client";

import { Card, Divider, Grid } from "@mui/material";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import { EditorState, SelectionState } from "draft-js";
import { htmlToEditorState } from "/utils/parseEditorState";
import FieldListItem from "./field-list-item";

export default function FieldList({
  mailTemplate,
  editorState,
  setEditorState,
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
          {mailTemplate.groups &&
            mailTemplate.groups.map((fieldGroup, index) => (
              <FieldListItem
                key={index}
                name={fieldGroup.name}
                slug={fieldGroup.slug}
                handleSlugClick={handleSlugClick}
              />
            ))}
        </Grid>
      </MDBox>
    </Card>
  );
}
