import { EditorType } from "types/index";
import CustomEditor from "./Editor";
import isUrl from "is-url";

const withLink = (editor: EditorType) => {
  const { insertData, isInline, insertText } = editor;

  editor.isInline = (element: any) => {
    return element.type === "link" || isInline(element);
  };

  // editor.insertText = (text) => {
  //   if (text && isUrl(text)) {
  //     CustomEditor.toggleLinkAtSelection(editor, text);
  //   } else {
  //     insertText(text);
  //   }
  // };

  // editor.insertData = (data) => {
  //   const text = data.getData("text/plain");

  //   if (text && isUrl(text)) {
  //     CustomEditor.toggleLinkAtSelection(editor, text);
  //   } else {
  //     insertData(data);
  //   }
  // };

  return editor;
};

export default withLink;
