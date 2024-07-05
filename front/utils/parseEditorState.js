import { EditorState, convertFromRaw } from "draft-js";

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const parseEditorState = (value) => {
  if (
    !value ||
    value.length === 0 ||
    value == "{}" ||
    value == "null" ||
    !isJsonString(value)
  ) {
    return EditorState.createEmpty();
  }
  const block = JSON.parse(value);
  const contentState = convertFromRaw(block);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
