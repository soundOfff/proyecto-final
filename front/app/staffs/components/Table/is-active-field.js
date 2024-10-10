"use client";

import { Switch } from "@mui/material";
import { useOptimistic, useTransition } from "react";
import { update } from "/actions/staffs";
import Loader from "/components/Loader";

export default function IsActiveField({ staff }) {
  const label = { inputProps: { "aria-label": "Is active switch" } };
  const [isPending, startTransition] = useTransition();
  const [checked, setChecked] = useOptimistic(Boolean(staff.active));

  const handleClick = (e) => {
    startTransition(() => {
      setChecked(e.target.checked);
      update(staff.id, { active: e.target.checked });
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <Switch {...label} checked={checked} onClick={handleClick} />
    </>
  );
}
