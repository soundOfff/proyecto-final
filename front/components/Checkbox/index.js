"use client";

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function CustomCheckbox({ checked, handleChange, label }) {
  return (
    <FormGroup sx={{ mt: 2 }}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={label}
      />
    </FormGroup>
  );
}
