import { Editor, Range, Point, Element } from "slate";
import { EditorType } from "types";

function withTable(editor: EditorType) {
  const { deleteBackward, deleteForward, insertBreak } = editor;

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell]: any = Editor.nodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell]: any = Editor.nodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n.type === "table-cell",
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table]: any = Editor.nodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n.type === "table",
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
}

export default withTable;
