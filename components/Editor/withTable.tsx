import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";

function withTable(editor: EditorType) {
  const { deleteBackward, deleteForward, insertBreak, insertText } = editor;

  //  Editor.point();
  // editor.

  editor.insertText = (text) => {
    const { selection } = editor;

    if (selection) {
      const [table]: any = Editor.nodes(editor, {
        match: (n: any) => {
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "table"
          );
        },
        mode: "all",
      });

      const [tableCell]: any = Editor.nodes(editor, {
        match: (n: any) => {
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "table-cell"
          );
        },
        mode: "all",
      });

      if (table && tableCell) {
        const [cell]: any = Editor.nodes(editor, {
          match: (n: any) => {
            return (
              !Editor.isEditor(n) &&
              (Element.isElement(n) as any) &&
              n.type.includes("list")
            );
          },
          mode: "all",
        });
      }
    }

    insertText(text);
  };

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
        match: (n: any) => {
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "table"
          );
        },
        mode: "all",
      });

      const [tableCell]: any = Editor.nodes(editor, {
        match: (n: any) => {
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "table-cell"
          );
        },
        mode: "all",
      });

      if (table && tableCell) {
        const [cell]: any = Editor.nodes(editor, {
          match: (n: any) => {
            const block = {
              type: "paragraph",
              children: [{ text: "" }],
              key: uuidv4(),
            };
            const listBlock = { type: "list-item", children: [{ text: "" }] };
            let list = false;

            n.type === "table-cell" &&
              n.children.map((child: any) => {
                if (child.type.includes("list")) {
                  list = true;
                }
              });

            n.type === "table-cell" &&
              !list &&
              Transforms.insertNodes(editor, block);

            n.type &&
              n.type.includes("list") &&
              Transforms.insertNodes(editor, listBlock);

            return (
              !Editor.isEditor(n) &&
              (Element.isElement(n) as any) &&
              n.type &&
              n.type.includes("list")
            );
          },
          mode: "all",
        });
        return;
      }
    }

    insertBreak();
  };

  return editor;
}

export default withTable;
