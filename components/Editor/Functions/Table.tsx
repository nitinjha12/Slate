import { Transforms, Editor, Element } from "slate";
import { ReactEditor } from "slate-react";
import { EditorType } from "types";

const Table = {
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

    // if (table) {
    //   Transforms.removeNodes(editor, {
    //     match: (n: any) =>
    //       !Editor.isEditor(n) &&
    //       (Element.isElement(n) as any) &&
    //       n.type === "table",
    //   });
    // }

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

    Transforms.setNodes(editor, data[0]);
    editor.selection = selection.selection;

    ReactEditor.focus(editor);
  },
  columnLoop(tableRow: any, column: number, i: number) {
    for (let j = 0; j < column; j++) {
      tableRow[i].children.push({
        type: "table-cell",
        children: [{ type: "paragraph", children: [{ text: "" }] }],
        colSpan: 1,
        rowSpan: 1,
        display: true,
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
    if (str.includes("right")) {
      for (let row of rows) {
        const column: any = {
          type: "table-cell",
          children: [{ type: "paragraph", children: [{ text: "" }] }],
          colSpan: 1,
          rowSpan: 1,
          display: true,
        };
        row.children.splice(position + 1, 0, column);
      }
    }

    if (str.includes("left")) {
      for (let row of rows) {
        const column: any = {
          type: "table-cell",
          children: [{ type: "paragraph", children: [{ text: "" }] }],
          colSpan: 1,
          rowSpan: 1,
          display: true,
        };
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

export default Table;
