"use client";

import MDBox from "/components/MDBox";
import MDProgress from "/components/MDProgress";
import MDTypography from "/components/MDTypography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Add, Clear } from "@mui/icons-material";
import { TextField } from "@mui/material";

import { update } from "/actions/tasks";
import useTodo from "/hooks/useTodo";

const addTaskButton = (createItem) => (
  <ListItem
    key="add-item"
    secondaryAction={
      <Add edge="end" aria-label="add" sx={{ cursor: "pointer", mx: 0.5 }} />
    }
    sx={{
      width: "100%",
      px: 0,
      justifyContent: "start",
    }}
    disablePadding
    onClick={() => createItem()}
  >
    <ListItemButton dense disablePadding>
      <ListItemText
        sx={{
          textAlign: "left",
          fontSize: "small",
        }}
        id="add-item"
        primary="Crear una nueva tarea"
        color="info"
      />
    </ListItemButton>
  </ListItem>
);

export default function ItemList({
  checklistItems,
  taskId,
  refetch = () => {},
}) {
  const {
    items,
    progress,
    getFilteredItems,
    createItem,
    toggleChecked,
    removeItem,
    editItem,
  } = useTodo(checklistItems);

  const handleSaveItems = async () => {
    await update(taskId, { checklist_items: getFilteredItems() });
    refetch();
  };

  const handleDeleteItem = async (id) => {
    const newItems = items.filter((item) => item.id !== id); // Server update
    removeItem(id); // UI update
    await update(taskId, { checklist_items: newItems });
    refetch();
  };

  return (
    <MDBox py={2} px={1}>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="body2" fontWeight="bold" mb={2}>
          Lista de Quehaceres
        </MDTypography>
        <MDBox sx={{ width: "100%", my: 1 }}>
          {progress > 0 && (
            <MDBox
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <MDBox width="100%" mt={0.25}>
                <MDProgress
                  variant="gradient"
                  color="success"
                  value={progress}
                />
              </MDBox>
              <MDBox sx={{ minWidth: 40, mx: 2 }}>
                <MDTypography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(progress)}%`}</MDTypography>
              </MDBox>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        {items.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          return (
            <ListItem
              key={value.id}
              onBlur={() => handleSaveItems()}
              sx={{
                p: 1,
                px: 1,
                display: "flex",
                flexDirection: { sm: "column", md: "row" },
                alignItems: { sm: "flex-start", md: "center" },
              }}
              secondaryAction={
                <Clear
                  edge="end"
                  color="error"
                  aria-label="delete"
                  sx={{ cursor: "pointer", mx: 1 }}
                  onClick={() => handleDeleteItem(value.id)}
                />
              }
              disablePadding
            >
              <ListItemButton
                dense
                sx={{
                  display: "flex",
                  flexDirection: { sm: "column", md: "row" },
                  alignItems: { sm: "flex-start", md: "center" },
                  width: "100%",
                }}
              >
                <ListItemIcon
                  sx={{ alignSelf: { sm: "flex-start", md: "center" } }}
                >
                  <Checkbox
                    edge="start"
                    checked={value.finished}
                    tabIndex={-1}
                    disableRipple
                    onClick={() => toggleChecked(value.id, !value.finished)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <TextField
                  defaultValue={value.description}
                  onChange={(e) => editItem(value.id, e.target.value)}
                  margin="dense"
                  id="name"
                  fullWidth
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {addTaskButton(createItem)}
      </List>
    </MDBox>
  );
}
