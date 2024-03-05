import { EditorState, convertFromRaw } from "draft-js";

export const parseEditorState = (value) => {
  if (!value || value.length === 0 || value == "{}" || value == "null") {
    return EditorState.createEmpty();
  }
  const block = JSON.parse(value);
  const contentState = convertFromRaw(block);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
