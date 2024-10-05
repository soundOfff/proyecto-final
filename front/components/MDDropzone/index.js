"use client";

import { useEffect, useMemo, useRef } from "react";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

// Custom styles for the MDDropzone
import MDDropzoneRoot from "/components/MDDropzone/MDDropzoneRoot";

// NextJS Material Dashboard 2 PRO context
import { useMaterialUIController } from "/context";

function MDDropzone({ options, setFieldValue, multiple = false }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

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
        setFieldValue("file", file);
        setFieldValue("name", file?.upload?.filename.split(".")[0]);
      });

      dropzoneInstance.current.on("removedfile", () => {
        setFieldValue("file", null);
        setFieldValue("name", "");
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
  }, [memoizedOptions, setFieldValue]);

  return (
    <MDDropzoneRoot
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <MDBox className="fallback" bgColor="transparent">
        <MDBox component="input" name="file" type="file" multiple={multiple} />
      </MDBox>
    </MDDropzoneRoot>
  );
}

export default MDDropzone;
