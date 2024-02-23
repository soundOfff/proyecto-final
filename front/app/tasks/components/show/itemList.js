import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Add, Clear } from "@mui/icons-material";
import { useState } from "react";
import { TextField } from "@mui/material";

const addTaskButton = (addNewTask) => (
  <ListItem
    key="add-item"
    secondaryAction={
      <Add edge="end" aria-label="comments" sx={{ cursor: "pointer", mx: 2 }} />
    }
    sx={{ height: "40px" }}
    disablePadding
    onClick={() => addNewTask()}
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

export default function ItemList({ items, addNewTask, editTask, removeTask }) {
  const [checked, setChecked] = useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
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
            secondaryAction={
              <Clear
                edge="end"
                color="error"
                aria-label="comments"
                sx={{ cursor: "pointer", mx: 2 }}
                onClick={() => removeTask(value.id)}
              />
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(value.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <TextField
                defaultValue={value.content}
                onChange={(e) => editTask(e, value.id)}
                margin="dense"
                id="name"
                fullWidth
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      {addTaskButton(addNewTask)}
    </List>
  );
}
