import React, { useRef } from "react";
import { Editor, Transforms, Text, Element, Range, Point } from "slate";
// import { useSlateStatic } from "slate-react";
import { EditorType, EditorInterface } from "types";
import { customEditorData } from "./data";
import { isLinkNodeAtSelection } from "./helper";
import Toolbar from "./Toolbar";
import { EmbedUrl } from "./EmbedUrl";
import { ReactEditor } from "slate-react";

const LIST_TYPES = ["bulleted-list", "ordered-list"];
const ALIGN_TYPES = ["left-align", "right-align", "center-align"];

const CustomEditor = {
  // editor: useSlateStatic(),

  isBlockActive({ editor, value }: EditorInterface) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => {
        if (value) {
          return n.type === value;
        }
        return false;
      },
      // mode: "all",
    }) as any;

    return !!match;
  },

  isMarkActive(editor: EditorType, format: string) {
    const marks: any = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  toggleMark(editor: EditorType, format: string) {
    const isActive = this.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },

  toggleBlock(
    { editor, value, type = "" }: EditorInterface,
    markBlock = false
  ) {
    const isActive = this.isBlockActive({ editor, value, type });

    if (value && LIST_TYPES.includes(value)) {
      this.toggleListBlock(editor, isActive, value);
      return;
    }

    if (value && ALIGN_TYPES.includes(value)) {
      this.toggleAlignBlock(editor, isActive, value);
      return;
    }

    if (value === "code") {
      this.toggleCodeBlock(editor, isActive, value);
      return;
    }

    if (markBlock) {
      this.toggleMark(editor, type);
      return;
    }

    Transforms.setNodes(editor, { type: isActive ? null : value } as any, {
      match: (n: any) => Editor.isBlock(editor, n),
    });
  },

  toggleCodeBlock(editor: EditorType, isActive: boolean, format: string) {
    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        !Editor.isEditor(n) &&
        (Element.isElement(n) as any) &&
        n.type === format,
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : "span",
    } as any);

    if (!isActive) {
      Transforms.wrapNodes(editor, { type: format, children: [] } as any);
    }
  },

  toggleListBlock(editor: EditorType, isActive: boolean, format: string) {
    Transforms.unwrapNodes(editor, {
      match: (n: any) => {
        return LIST_TYPES.includes(
          !Editor.isEditor(n) && (Element.isElement(n) as any) && n.type
        );
      },
      split: true,
    });

    const isList = LIST_TYPES.includes(format);

    const newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    } as any;
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  toggleAlignBlock(editor: EditorType, isActive: boolean, format: string) {
    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        ALIGN_TYPES.includes(
          !Editor.isEditor(n) && (Element.isElement(n) as any) && n.type
        ),
      split: true,
    });

    if (!isActive) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  toggleLinkAtSelection(editor: EditorType) {
    const { selection } = editor;

    // this.removeLink(editor);

    if (!isLinkNodeAtSelection(editor, selection!)) {
      const isSelectionCollapsed = selection && Range.isCollapsed(selection);

      if (isSelectionCollapsed) {
        Transforms.insertNodes(
          editor,
          {
            type: "link",
            url: "https://google.com",
            children: [{ text: "link" }],
          } as any
          // { at: selection! }
        );
      } else {
        Transforms.wrapNodes(
          editor,
          {
            type: "link",
            url: "https://google.com",
            children: [{ text: "" }],
          } as any,
          { split: true }
        );
      }
    } else {
      Transforms.unwrapNodes(editor, {
        match: (n: any) => (Element.isElement(n) as any) && n.type === "link",
      });
    }
  },
  removeLink(editor: EditorType) {
    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        !Editor.isEditor(n) &&
        (Element.isElement(n) as any) &&
        n.type === "link",
    });
  },
  imageStyle(editor: EditorType, style: React.CSSProperties) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "image",
    }) as any;

    Transforms.setNodes(
      editor,
      { style: { ...match[0].style, ...style } } as any,
      {
        at: editor.selection!,
      }
    );
  },
  isImageStyle(editor: EditorType, properties: string, value: string) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => {
        if (value) {
          return n.style?.[properties] === value;
        }
        return false;
      },
    }) as any;

    return !!match;
  },
  AddingVideoSrc(editor: EditorType, src: string) {
    const { selection } = editor;

    const embedUrl = EmbedUrl(src);

    if (selection) {
      Transforms.insertNodes(
        editor,
        [
          {
            type: "video",
            src: embedUrl,
            children: [{ text: "" }],
          },
          { type: "paragraph", children: [{ text: "" }] },
        ] as any,
        { at: selection }
      );
    }
  },
  insertTable(editor: EditorType, dimension: any) {
    const tableRow = [];

    for (let i = 0; i < dimension.row; i++) {
      tableRow.push({
        type: "table-row",
        children: [] as any,
      });

      this.columnLoop(tableRow, dimension.column, i);
    }

    const newProperties = {
      type: "table",
      children: [{ type: "table-body", children: tableRow }],
    };

    Transforms.insertNodes(editor, newProperties);
  },

  rowOperations(editor: EditorType, str: string) {
    const [table] = Editor.nodes(editor, {
      match: (n: any) => n.type === "table",
    }) as any;

    const [row] = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-row",
    }) as any;

    const data = JSON.parse(JSON.stringify(table));

    let selection = null;

    if (!selection) {
      selection = JSON.parse(JSON.stringify(editor)) as any;
    }

    if (str.includes("above")) {
      selection.selection.anchor.path[2]++;
      selection.selection.focus.path[2]++;
    }

    const rowLength = table[0].children[0].children.length;

    const beforeDeletedRow =
      table[0].children[0].children[selection.selection.anchor.path[2] - 1];

    if (str.includes("delete") && beforeDeletedRow) {
      const offset =
        beforeDeletedRow.children[selection.selection.anchor.path[3]]
          .children[0].text.length - 1;

      selection.selection.anchor.path[2]--;
      selection.selection.focus.path[2]--;
      selection.selection.anchor.offset = offset;
      selection.selection.focus.offset = offset;
    }

    if (table) {
      Transforms.removeNodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n.type === "table",
      });
    }

    this.rowOperationsHelper(
      editor,
      data,
      str,
      row[1][2],
      row[0].children.length,
      selection!,
      rowLength
    );
  },
  rowOperationsHelper(
    editor: EditorType,
    data: any,
    str: string,
    position: number,
    column: number,
    selection: EditorType,
    rowLength: number
  ) {
    const row: any = [
      {
        type: "table-row",
        children: [],
      },
    ];

    this.columnLoop(row, column, 0);

    if (str.includes("above")) {
      data[0].children[0].children.splice(position, 0, row[0]);
    }

    if (str.includes("below")) {
      data[0].children[0].children.splice(position + 1, 0, row[0]);
    }

    if (str.includes("delete")) {
      data[0].children[0].children.splice(position, 1);
    }
    if (rowLength === 1 && str.includes("delete")) return;

    Transforms.insertNodes(editor, data[0]);
    editor.selection = selection.selection;

    ReactEditor.focus(editor);
  },
  columnLoop(tableRow: any, column: number, i: number) {
    for (let j = 0; j < column; j++) {
      tableRow[i].children.push({
        type: "table-cell",
        children: [{ text: "" }],
      } as any);
    }
  },
  addColumn(editor: EditorType, str: string) {
    const [table] = Editor.nodes(editor, {
      match: (n: any) => n.type === "table",
    }) as any;

    const [cell] = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-cell",
    }) as any;

    const data = JSON.parse(JSON.stringify(table));

    let selection = null;

    if (!selection) {
      selection = JSON.parse(JSON.stringify(editor)) as any;
    }

    if (str.includes("left")) {
      selection.selection.anchor.path[3]++;
      selection.selection.focus.path[3]++;
    }

    const rows = data[0].children[0].children;

    if (table) {
      Transforms.removeNodes(editor, {
        match: (n: any) =>
          !Editor.isEditor(n) &&
          (Element.isElement(n) as any) &&
          n.type === "table",
      });
    }

    this.addColumnHelper(editor, data, str, rows, cell[1][3], selection!);
  },
  addColumnHelper(
    editor: EditorType,
    data: any,
    str: string,
    rows: any,
    position: number,
    selection: EditorType
  ) {
    const column: any = {
      type: "table-cell",
      children: [{ text: "" }],
    };

    if (str.includes("right")) {
      for (let row of rows) {
        row.children.splice(position + 1, 0, column);
      }
    }

    if (str.includes("left")) {
      for (let row of rows) {
        row.children.splice(position, 0, column);
      }
    }

    if (str.includes("delete")) {
      for (let row of rows) {
        row.children.splice(position, 1);
      }
    }

    Transforms.insertNodes(editor, data[0]);
    if (!str.includes("delete")) editor.selection = selection.selection;

    // ReactEditor.blur(editor);
  },
};

export default CustomEditor;

export const onKeyDown = function (
  e: React.KeyboardEvent<HTMLElement>,
  editor: EditorType
) {
  if (!e.ctrlKey) return;

  switch (e.key) {
    case "`": {
      e.preventDefault();
      CustomEditor.toggleBlock({ editor, ...customEditorData.code.editorData });
      break;
    }

    case "b": {
      e.preventDefault();
      CustomEditor.toggleBlock(
        { editor, ...customEditorData.bold.editorData },
        true
      );
      break;
    }
  }
};
