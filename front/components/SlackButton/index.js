"use client";

import MDButton from "/components/MDButton";
import SlackIcon from "/assets/icons/slack-icon";

export default function SlackButton({ onClick, label = "Compartir", ...rest }) {
  return (
    <MDButton color="dark" variant="gradient" onClick={onClick} {...rest}>
      <SlackIcon marginRight="10px" />
      {label}
    </MDButton>
  );
}
