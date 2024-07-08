import { EditorState, convertFromRaw } from "draft-js";

function isFromEditor(str) {
  try {
    const parsedValue = JSON.parse(str);
    if (typeof parsedValue !== "object") throw new Error("Not an object");
  } catch (e) {
    return false;
  }
  return true;
}

export const parseEditorState = (value) => {
  if (value && !isFromEditor(value)) {
    return EditorState.createWithText(value);
  }

  if (value && isFromEditor(value)) {
    const block = JSON.parse(value);
    const contentState = convertFromRaw(block);
    return EditorState.createWithContent(contentState);
  }

  return EditorState.createEmpty();
};
