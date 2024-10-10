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
      <Add edge="end" aria-label="comments" sx={{ cursor: "pointer", mx: 2 }} />
    }
    sx={{ height: "40px" }}
    disablePadding
    onClick={() => createItem()}
  >
    <ListItemButton dense>
      <ListItemText
        id="add-item"
        primary={`Crear una nueva tarea`}
        color="info"
      />
    </ListItemButton>
  </ListItem>
);

export default function ItemList({ checklistItems, taskId }) {
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
  };

  const handleDeleteItem = async (id) => {
    const newItems = items.filter((item) => item.id !== id); // Server update
    removeItem(id); // UI update
    await update(taskId, { checklist_items: newItems });
  };

  return (
    <MDBox py={2}>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="body2" fontWeight="bold">
          Lista de Quehaceres
        </MDTypography>
        <MDBox sx={{ width: "80%", my: 1 }}>
          {progress > 0 && (
            <MDBox
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: "1",
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
          width: "80%",
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
              sx={{ p: 1 }}
              secondaryAction={
                <Clear
                  edge="end"
                  color="error"
                  aria-label="comments"
                  sx={{ cursor: "pointer", mx: 2 }}
                  onClick={() => handleDeleteItem(value.id)}
                />
              }
              disablePadding
            >
              <ListItemButton dense>
                <ListItemIcon>
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
