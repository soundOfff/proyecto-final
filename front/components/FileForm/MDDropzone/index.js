"use client";

import { useEffect, useMemo, useRef } from "react";
import { Icon } from "@mui/material";
import { FileUpload as FileUploadIcon } from "@mui/icons-material";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";

// Dropzone styles
import "dropzone/dist/dropzone.css";

function MDDropzone({ options, addFields, removeFile, multiple = false }) {
  const dropzoneRef = useRef();
  const dropzoneInstance = useRef();

  const memoizedOptions = useMemo(() => options, [options]);

  useEffect(() => {
    async function createDropzone() {
      const Dropzone = (await import("dropzone")).default;

      Dropzone.autoDiscover = false;

      if (dropzoneInstance.current) {
        dropzoneInstance.current.destroy();
      }

      dropzoneInstance.current = new Dropzone(dropzoneRef.current, {
        ...memoizedOptions,
      });

      dropzoneInstance.current.on("addedfile", (file) => {
        addFields(file);
        file.previewElement
          .querySelectorAll(".dz-remove")
          .forEach((preview) => {
            preview.innerText = "❌";
          });
      });

      dropzoneInstance.current.on("removedfile", (file) => {
        removeFile(file);
      });

      return dropzoneInstance.current;
    }

    function removeDropzone() {
      if (dropzoneInstance.current) {
        dropzoneInstance.current.destroy();
      }
    }

    createDropzone();

    return () => removeDropzone();
  }, [memoizedOptions]);

  return (
    <MDBox
      className="dropzone dropzone-queue"
      id="modified-dropzone-js"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      border="1px dashed gray"
      padding={2}
      ref={dropzoneRef}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },

        "&:hover .dz-preview.dz-image-preview": {
          backgroundColor: "#f9fafb !important",
        },

        "& .dz-preview.dz-image-preview": {
          background: `#ffff !important`,
        },

        "& .dz-preview .dz-details": {
          color: `black !important`,
          opacity: "1 !important",

          "& .dz-size span, & .dz-filename span": {
            backgroundColor: `#f0f0f0 !important`,
          },
        },

        "& .dz-preview .dz-progress": {
          display: "none !important",
          opacity: "0 !important",
        },

        "& .dz-error-message": {
          display: "none !important",
        },
        "& .dz-size span": {
          padding: "4px !important",
        },
        "& .dz-remove": {
          mx: "auto",
          mt: 1,
          backgroundColor: `#f0f0f0 !important`,
          display: "flex !important",
          alignItems: "center",
          justifyContent: "center",
          width: "32px",
          height: "32px",
          textDecoration: "none",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "16px",
          "&:hover, &:focus": {
            backgroundColor: `#e0e0e0 !important`,
            textDecoration: "none !important",
          },
        },
      }}
    >
      <MDBox ml={4} textAlign="center" className="dz-message needsclick">
        <Icon color="info" fontSize="large">
          <FileUploadIcon />
        </Icon>
        <MDTypography
          variant="h5"
          component="h3"
          color="textPrimary"
          fontWeight="bold"
        >
          Arroja tus archivos aquí o haz clic para seleccionarlos
        </MDTypography>
        <MDTypography variant="body2" color="textSecondary" fontWeight="medium">
          Solo se permiten hasta 5 archivos
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default MDDropzone;
