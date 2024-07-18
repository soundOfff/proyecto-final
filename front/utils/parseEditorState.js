import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";

function isFromEditor(str) {
  try {
    const parsedValue = JSON.parse(str);
    if (typeof parsedValue !== "object") throw new Error("Not an object");
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
export const htmlToEditorState = (htmlString) => {
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
  @return {string}
  This function receives an EditorState object and returns a string formatted as HTML.
*/
export const editorStateToHtml = (editorState) => {
  const rawContentState = convertToRaw(editorState.getCurrentContent());

  const markup = draftToHtml(rawContentState);

  return markup;
};

export const parseEditorState = (contentBlockString) => {
  if (contentBlockString && !isFromEditor(contentBlockString)) {
    return EditorState.createWithText(contentBlockString);
  }

  if (contentBlockString && isFromEditor(contentBlockString)) {
    const block = JSON.parse(contentBlockString);
    const contentState = convertFromRaw(block);
    return EditorState.createWithContent(contentState);
  }

  return EditorState.createEmpty();
};
