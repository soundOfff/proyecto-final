"use client";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import MDBox from "/components/MDBox";
import MDButton from "/components/MDButton";

export default function NodeForm({
  node = null,
  processId,
  onSubmit,
  onNodeCreated,
  totalNodes,
}) {
  const [form, setForm] = useState({
    name: node?.name || "",
    isConditional: node?.isConditional || false,
    stepNumber: node?.stepNumber || totalNodes,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit({
      name: form.name,
      step_number: form.stepNumber,
      is_conditional: form.isConditional,
      author_id: 1,
      process_id: processId,
    });
    onNodeCreated();
    setForm({
      name: "",
      isConditional: false,
      stepNumber: 0,
    });
  };

  return (
    <MDBox m={4} sx={{ z: 1 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <TextField
          label="Procedimiento"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{
            width: "400px",
          }}
        />
        <TextField
          label="Step Number"
          name="stepNumber"
          value={form.stepNumber}
          onChange={handleChange}
          type="number"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isConditional}
              onChange={(e) =>
                setForm({ ...form, isConditional: e.target.checked })
              }
            />
          }
          label="Es condicional"
        />
        <MDButton variant="gradient" color="dark" size="small" type="submit">
          Nuevo procedimiento
        </MDButton>
      </form>
    </MDBox>
  );
}
