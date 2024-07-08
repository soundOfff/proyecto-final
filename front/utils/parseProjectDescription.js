import { parseEditorState } from "./parseEditorState";

function isFromEditor(str) {
  try {
    const parsedValue = JSON.parse(str);
    if (typeof parsedValue !== "object") throw new Error("Not an object");
  } catch (e) {
    return false;
  }
  return true;
}

export function parseProjectDescription(description) {
  return isFromEditor(description)
    ? parseEditorState(description).getCurrentContent().getPlainText()
    : description;
}
