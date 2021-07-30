import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";

function withTable(editor: EditorType) {
  const { deleteBackward, deleteForward, insertBreak, insertText } = editor;

  //  Editor.point();
  // editor.

  editor.insertText = (text) => {
    // console.log("text");

    const { selection } = editor;
    const [start] = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-cell",
      at: selection?.anchor.path,
    }) as any;
    const [end]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-cell",
      at: selection?.focus.path,
    });
    // Collapse selection if multiple table-cells are selected to avoid breaking the table
    if (
      selection &&
      !Range.isCollapsed(selection) &&
      (start || end) &&
      start?.[0] !== end?.[0]
    ) {
      const [cell]: any = Editor.nodes(editor, {
        match: (n: any) => n.type === "table-cell",
      });
      if (cell) {
        Transforms.collapse(editor, { edge: "end" });
        insertText(text);
        return;
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
          // console.log(n);
          // console.log(Transforms);
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type === "table"
          );
        },
        mode: "all",
      });
      const [cell]: any = Editor.nodes(editor, {
        match: (n: any) => {
          const block = { type: "paragraph", children: [{ text: "" }] };
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

          // console.log(JSON.parse(JSON.stringify(editor.operations)));
          return (
            !Editor.isEditor(n) &&
            (Element.isElement(n) as any) &&
            n.type &&
            n.type.includes("list")
          );
        },
        mode: "all",
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
