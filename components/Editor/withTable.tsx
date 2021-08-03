import { Editor, Range, Point, Element, Transforms, Node, Text } from "slate";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";

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

      if (table) {
        const nodeDomTraversal = (
          editor: EditorType,
          ele: HTMLElement,
          type: string,
          path = editor.selection!.anchor.path
        ): any => {
          console.log(editor, ele, type, path);

          if (ele?.classList.contains("toolbar__dragndrop")) {
            ele.remove();
            return;
          }

          // if (editor?.type === type) return ele;

          return nodeDomTraversal(
            editor.children[path[0]] as any,
            ele.childNodes[path[0]] as any,
            type,
            path.slice(1)
          );
        };

        const [cell]: any = Editor.nodes(editor, {
          match: (n: any) => {
            // console.log(n);

            // const path = n.type && ReactEditor.findPath(editor, n);
            // const editableEle =
            //   document.querySelector<HTMLElement>(".editor__editable");

            // console.log(path);
            // if (n.type === "paragraph") {
            //   const dom = nodeDomTraversal(editor, editableEle!, n.type, path);
            // }

            return (
              !Editor.isEditor(n) &&
              (Element.isElement(n) as any) &&
              n.type.includes("list")
            );
          },
          mode: "all",
        });
        const dragBtn = document.querySelector<HTMLElement>(
          ".dragIndicator__icon"
        );

        dragBtn!.style.display = "none";
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

      if (table) {
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
        return;
      }
    }

    insertBreak();
  };

  return editor;
}

export default withTable;
