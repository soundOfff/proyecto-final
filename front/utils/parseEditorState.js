import { ContentState, EditorState, convertFromRaw } from "draft-js";

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/*
  @param {string} value
  @return {EditorState}
  This function receives a string formatted as HTML and returns an EditorState object.
*/
export const convertToHtml = (htmlString) => {
  const htmlToDraft =
    typeof window === "object" && require("html-to-draftjs").default; // Needed for SSR

  const blocks = htmlToDraft(htmlString);
  const { contentBlocks, entityMap } = blocks;
  if (contentBlocks) {
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  }
  return EditorState.createEmpty();
};

/* 
  @param {string} value
  @return {EditorState}
  This function receives a string formatted as Content blocks and returns an EditorState object.
*/
export const parseEditorState = (contentBlockString) => {
  if (
    !contentBlockString ||
    contentBlockString.length === 0 ||
    contentBlockString == "{}" ||
    contentBlockString == "null" ||
    !isJsonString(contentBlockString)
  ) {
    return EditorState.createEmpty();
  }
  const block = JSON.parse(contentBlockString);
  const contentState = convertFromRaw(block);
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};
