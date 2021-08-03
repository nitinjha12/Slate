import React, { Children, useRef } from "react";
import { Editor, Transforms, Text, Element, Range, Point } from "slate";
// import { useSlateStatic } from "slate-react";
import { EditorType, EditorInterface } from "types";
import { customEditorData } from "./data";
import { isLinkNodeAtSelection } from "./helper";
import { EmbedUrl } from "./EmbedUrl";
import { ReactEditor } from "slate-react";
import Table from "./Functions/Table";
import findDomNode from "./findDomNode";

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
    // const align = format.split("-");

    // const domNode = findDomNode(
    //   editor,
    //   editor.selection?.anchor.path[0]!
    // ) as HTMLElement;

    // domNode.style.textAlign = align[0];

    Transforms.unwrapNodes(editor, {
      match: (n: any) =>
        ALIGN_TYPES.includes(
          !Editor.isEditor(n) && (Element.isElement(n) as any) && n.type
        ),
      split: true,
    });

    if (!isActive) {
      Transforms.wrapNodes(editor, { type: format, children: [] } as any);
    }
  },
  addGridLayout(
    editor: EditorType,
    num: number,
    setValue: Function,
    path: number[]
  ) {
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

    const removeNode = newEditor.children[path[0]];
    const dropNode = newEditor.children[num];

    console.log(
      num,
      dropNode,
      path,
      JSON.parse(JSON.stringify(editor.children[num]))
    );
    const position = ReactEditor.findPath(editor, editor.children[num]);

    if (newEditor.children[num].type === "grid-layout") {
      const totalLength = newEditor.children[num].children.length + 1;

      for (let data of newEditor.children[num].children) {
        data.width = 100 / totalLength;
        data.line = true;
      }

      console.log(100 / totalLength, totalLength);

      Transforms.removeNodes(editor, { at: path });

      // console.log(position, newEditor.children[num].children);

      const block = {
        type: "grid-layout",
        children: [
          ...newEditor.children[num].children,
          {
            children: [removeNode],
            type: "grid-layout-child",
            width: 100 / totalLength,
            line: true,
          },
        ],
      };

      block.children[block.children.length - 1].line = false;

      console.log(block);

      Transforms.removeNodes(editor, {
        // match: (n: any) => n.type === "grid-layout",
        at: [num],
      });

      Transforms.insertNodes(editor, block, { at: [num] });
      return;
    }

    console.log(newEditor.children[num], newEditor.children[path[0]], num);

    Transforms.removeNodes(editor, { at: path });

    // console.log(position);

    const block = {
      type: "grid-layout",
      children: [
        {
          children: [dropNode],
          width: 50,
          type: "grid-layout-child",
          line: true,
        },
        {
          children: [removeNode],
          width: 50,
          type: "grid-layout-child",
          line: false,
        },
      ],
    };

    // console.log(block);

    Transforms.removeNodes(editor, { at: [num] });
    Transforms.insertNodes(editor, block, { at: position });
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
