import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { Add, Clear } from "@mui/icons-material";
import { TextField } from "@mui/material";

const addTaskButton = (createTask) => (
  <ListItem
    key="add-item"
    secondaryAction={
      <Add edge="end" aria-label="comments" sx={{ cursor: "pointer", mx: 2 }} />
    }
    sx={{ height: "40px" }}
    disablePadding
    onClick={() => createTask()}
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

export default function ItemList({
  items,
  createTask,
  editTask,
  toggleChecked,
  removeTask,
  handleBlur,
}) {
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
            onBlur={() => handleBlur()}
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
                onChange={(e) => editTask(value.id, e.target.value)}
                margin="dense"
                id="name"
                fullWidth
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      {addTaskButton(createTask)}
    </List>
  );
}
