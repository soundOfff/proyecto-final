"use client";

import { Autocomplete } from "@mui/material";
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { useState } from "react";
import { update } from "/actions/projects";

export default function UpdateMembers({ projectId, staffs }) {
  const [members, setMembers] = useState([]);

  const handleUpdate = () => {
    update(projectId, {
      project_member_ids: members.map((member) => member.id),
    });
  };

  return (
    <MDBox display="inline-block" ml={5}>
      <Autocomplete
        multiple
        value={members}
        onChange={(_, newValues) => setMembers(newValues)}
        options={staffs}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <MDInput
            {...params}
            variant="standard"
            label="Asignar a"
            fullWidth
            InputLabelProps={{ shrink: true }}
            inputProps={{ ...params.inputProps }}
            sx={{ width: "250px" }}
          />
        )}
        sx={{ display: "inline-block" }}
      />
      <MDButton
        variant="gradient"
        color="dark"
        sx={{ ml: 5 }}
        onClick={handleUpdate}
      >
        Actualizar miembros
      </MDButton>
    </MDBox>
  );
}
