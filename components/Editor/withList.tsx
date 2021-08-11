import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";

function withList(editor: EditorType) {
  const { insertBreak } = editor;

  return editor;
}

export default withList;
