import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import React from "react";
import { useMaterialUIController } from "/context";

function CustomModal({
  open,
  onClose,
  width = "60%",
  height = "90%",
  px = { xxl: 4, xs: 4 },
  py = 2,
  children,
  ...rest
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { sm: width, xs: "90%" },
    height: { sm: height, xs: "90%" },
    bgcolor: darkMode ? "background.card" : "background.paper",
    opacity: 1,
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    overflow: "auto",
    py: py,
    px: px,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClose,
      });
    });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      {...rest}
    >
      <Fade in={open}>
        <Box sx={style}>{renderChildren()}</Box>
      </Fade>
    </Modal>
  );
}

export default CustomModal;
