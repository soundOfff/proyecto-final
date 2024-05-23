import { parseEditorState } from "./parseEditorState";

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function parseProjectDescription(description) {
  return isJsonString(description)
    ? parseEditorState(description).getCurrentContent().getPlainText()
    : description;
}
