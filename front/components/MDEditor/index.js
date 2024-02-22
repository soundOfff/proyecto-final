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

import React, { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import dynamic from "next/dynamic";

// draft-js
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Custom styles for the MDEditor
import MDEditorRoot from "./MDEditorRoot";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "/context";

function MDEditor({
  value = () => {},
  editorStyle,
  editorState,
  setEditorState,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <Editor
        editorState={editorState}
        editorStyle={editorStyle}
        onEditorStateChange={setEditorState}
        value={value}
      />
    </MDEditorRoot>
  );
}

// Typechecking props for the MDEditor
MDEditor.propTypes = {
  value: PropTypes.func,
};

export default MDEditor;
