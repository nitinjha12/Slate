import { EditorType } from "types/index";
import CustomEditor from "./Editor";

const withImage = (editor: EditorType) => {
  const { isVoid } = editor;

  editor.isVoid = (element: any) => {
    return ["image"].includes(element.type) || isVoid(element);
  };

  return editor;
};

export default withImage;
