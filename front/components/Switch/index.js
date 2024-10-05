"use client";

import { FormControlLabel, FormGroup, Switch } from "@mui/material";

export default function SwitchComponent({ name, label, value, onChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={value} onChange={onChange} name={name} />}
        label={label}
      />
    </FormGroup>
  );
}
