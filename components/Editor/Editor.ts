import React, { Children, useRef } from "react";
import { Editor, Transforms, Text, Element, Range, Point } from "slate";
// import { useSlateStatic } from "slate-react";
import { EditorType, EditorInterface } from "types";
import { customEditorData } from "./data";
import { isLinkNodeAtSelection } from "./helper";
import { EmbedUrl } from "./EmbedUrl";
import { ReactEditor } from "slate-react";
import Table from "./Functions/Table";

const LIST_TYPES = ["bulleted-list", "ordered-list", "toggle-list"];
const ALIGN_TYPES = ["left-align", "right-align", "center-align"];

const CustomEditor = {
  // editor: useSlateStatic(),

  isBlockActive({ editor, value }: EditorInterface) {
    const [match] = Editor.nodes(editor, {
      match: (n: any) =>
        !Editor.isEditor(n) &&
        (Element.isElement(n) as any) &&
        n.type === value,
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
    const isList = LIST_TYPES.includes(value!);

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

    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        LIST_TYPES.includes(
          !Editor.isEditor(n) && (Element.isElement(n) as any) && n.type
        ),
      split: true,
    });
    const newProperties: Partial<any> = {
      type: isActive ? "paragraph" : isList ? "list-item" : value,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: value, children: [] };
      Transforms.wrapNodes(
        editor,
        ["toggle-list"].includes(value!)
          ? ({ ...block, title: "Title" } as any)
          : block
      );
    }
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
  addGridLayout(editor: EditorType, num: number, setValue: Function) {
    const children = [];

    const newEditor = JSON.parse(JSON.stringify(editor));

    // for (let i = 0; i < num; i++) {
    //   children.push({
    //     type: "grid-layout-child",
    //     width: 100 / num,
    //     children: [{ text: "" }],
    //   });
    // }

    // const block = { type: "grid-layout", children: children };

    const removeNode = newEditor.children[newEditor.selection?.anchor.path[0]];
    const dropNode = newEditor.children[num];

    if (newEditor.children[num].type === "grid-layout") {
      for (let data of newEditor.children[num].children) {
        data.width = 100 / newEditor.children[num].children.length + 1;
      }

      Transforms.removeNodes(editor, {
        match: (n: any) => n.type === "grid-layout",
      });

      console.log(editor.selection);

      const block = {
        type: "grid-layout",
        children: [
          ...newEditor.children[num].children,
          {
            children: [removeNode],
            type: "grid-layout-child",
            width: 100 / newEditor.children[num].children.length + 1,
          },
        ],
      };

      console.log(block);

      Transforms.insertNodes(editor, block);
      return;
    }

    console.log(
      newEditor.children[num],
      newEditor.children[newEditor.selection.anchor.path[0]],
      num,
      // newEditor.selection.anchor.path[0]
      editor.selection?.anchor.path[0]
    );

    Transforms.removeNodes(editor);
    Transforms.removeNodes(editor, { at: [num] });

    // console.log(removeNode, dropNode);

    // setValue(newEditor.children);

    const block = {
      type: "grid-layout",
      children: [
        {
          children: [dropNode],
          width: 50,
          type: "grid-layout-child",
        },
        {
          children: [removeNode],
          width: 50,
          type: "grid-layout-child",
        },
      ],
    };

    console.log(block);

    Transforms.insertNodes(editor, block, { at: newEditor.selection });

    console.log("got it");
  },

  toggleLinkAtSelection(editor: EditorType) {
    const { selection } = editor;

    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "link",
    }) as any;

    if (match && match[0]) {
      Transforms.unwrapNodes(editor, { match: (n: any) => n.type === "link" });
    }

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
    Table.insertTable(editor, dimension);
  },
  rowOperation(editor: EditorType, str: string) {
    Table.rowOperations(editor, str);
  },
  columnOperation(editor: EditorType, str: string) {
    Table.addColumn(editor, str);
  },

  mergeTable(editor: EditorType, type: string) {
    console.log(type);
    const newEditor = JSON.parse(JSON.stringify(editor));

    function nodeTraversal(
      editor: any,
      type: string,
      path = editor.selection.anchor.path
      // memo: any = {}
    ): any {
      console.log(editor, type, path);

      if (editor?.type === type) return editor;

      return nodeTraversal(editor.children[path[0]], type, path.slice(1));
    }

    const [cell]: any = nodeTraversal(newEditor, "table-cell");

    console.log(cell);

    const [row]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-row",
    });

    const [tableBody]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "table-body",
    });

    if (type.includes("row")) {
      if (type.includes("up")) {
        const nextCellNum = cell[1][cell[1].length - 1] - 1;
        if (!tableBody[0].children[nextCellNum]) {
          return;
        }

        cell.rowSpan = Number(cell.rowSpan) + 1;
      }

      if (type.includes("down")) {
        const nextCellNum = cell[1][cell[1].length - 1] + 1;
        if (!tableBody[0].children[nextCellNum]) {
          return;
        }

        let nextCell =
          tableBody[0].children[nextCellNum].children[
            cell[1][cell[1].length - 1]
          ];

        cell[0] = { ...cell[0], rowSpan: Number(cell[0].rowSpan) + 1 };

        // console.log(editor.selection, cell, nextCell, tableBody);
        nextCell = { ...nextCell, display: false };
        console.log(
          editor.selection,
          cell,
          nextCell,
          tableBody,
          editor.children
        );
      }
    }
  },

  mergeRow() {},
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
