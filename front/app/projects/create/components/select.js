"use client";

import Autocomplete from "@mui/material/Autocomplete";
import FormField from "/pagesComponents/pages/account/components/FormField";

export default function Select({ data, label, multiple }) {
  return (
    <Autocomplete
      multiple={multiple}
      options={data}
      renderInput={(params) => (
        <FormField
          {...params}
          label={label}
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}
