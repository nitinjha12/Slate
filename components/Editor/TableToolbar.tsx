import React, { useRef, useEffect, useContext } from "react";
import { TableFreezeRow } from "@styled-icons/fluentui-system-regular/TableFreezeRow";
import { TableFreezeColumn } from "@styled-icons/fluentui-system-regular/TableFreezeColumn";
import { TableDismiss } from "@styled-icons/fluentui-system-regular/TableDismiss";
import { TableCellsMerge } from "@styled-icons/fluentui-system-filled/TableCellsMerge";
import CustomEditor from "./Editor";
import { EditorType } from "types";
import { ReactEditor } from "slate-react";
import { Transforms } from "slate";
import Context from "context/context";

function TableToolbar({ editor, focused, dropDown, setDropdown }: any) {
  const selectionRef = useRef<any>(null);
  const lightCtx = useContext(Context);

  useEffect(() => {
    if (selectionRef.current !== editor.selection) {
      selectionRef.current = editor;
    }

    if (selectionRef.current) {
      ReactEditor.focus(selectionRef.current);
    }
  }, [editor.selection, focused]);

  const dropdownClickHandler = (e: any, i: number) => {
    document.querySelectorAll(".dropdown").forEach((drop, i) => {
      if (!e.currentTarget.childNodes[1].classList.contains(`dropdown--${i}`)) {
        drop.classList.add("element--hide");
      }
    });

    if (dropDown) {
      document
        .querySelector(`.dropdown--${i}`)
        ?.classList.toggle("element--hide");
    } else {
      document
        .querySelector(`.dropdown--${i}`)
        ?.classList.remove("element--hide");
    }
    setDropdown(true);
  };

  // const buttonClickHandler = function () {};

  return (
    <section className={`tabletoolbar ${lightCtx.isLight ? "light" : "dark"}`}>
      {tableToolbarArr.map((data: any, i: number) => {
        return data.list ? (
          <button
            className={`btn--toolbar toolbar__option ${
              lightCtx.isLight ? "light" : "dark"
            }`}
            key={i}
            onClick={(e) => dropdownClickHandler(e, i)}
          >
            {data.children}
            {
              <span
                className={`dropdown dropdown--${i} element--hide`}
                contentEditable={false}
              >
                {dropDown &&
                  data.list.map((str: string, j: number) => (
                    <span
                      key={j}
                      onClick={(e) => {
                        e.stopPropagation();
                        data.onMouseDown(
                          e,
                          editor,
                          e.currentTarget.innerHTML.toLowerCase()
                        );
                        document
                          .querySelectorAll(".dropdown")
                          .forEach((drop) => {
                            drop.classList.add("element--hide");
                          });
                      }}
                      className="dropdown__item"
                    >
                      {str}
                    </span>
                  ))}
              </span>
            }
          </button>
        ) : (
          <button
            className={`btn--toolbar toolbar__option ${
              lightCtx.isLight ? "light" : "dark"
            }`}
            key={i}
            onClick={(e) => {
              data.onMouseDown(e, editor);
            }}
          >
            {data.children}
          </button>
        );
      })}
    </section>
  );
}

export default TableToolbar;

const tableDataArr: any = [
  {
    value: "table-row",
    children: <TableFreezeRow size="20" />,
    list: ["Add Row Above", "Add Row Below", "Delete Row"],
  },
  {
    value: "table-column",
    children: <TableFreezeColumn size="20" />,
    list: ["Add Column left", "Add Column right", "Delete Column"],
  },
  {
    value: "table-remove",
    children: <TableDismiss size="20" />,
  },
  {
    value: "merge-table",
    children: <TableCellsMerge size="20" />,
    list: [
      "Merge Row Up",
      "Merge Row Down",
      "Merge Column Left",
      "Merge Column Right",
    ],
  },
];

const tableToolbarArr: any = [];

for (let data of tableDataArr) {
  tableToolbarArr.push({
    onMouseDown(e: React.MouseEvent, editor: EditorType, str: string) {
      e.preventDefault();

      if (data.value === "table-row") {
        return CustomEditor.rowOperation(editor, str);
      }
      if (data.value === "table-column") {
        return CustomEditor.columnOperation(editor, str);
      }

      if (data.value === "table-remove") {
        Transforms.removeNodes(editor, {
          match: (n: any) => n.type === "table",
        });
        return;
      }

      if (data.value === "merge-table") {
        CustomEditor.mergeTable(editor, str);
        return;
      }
    },
    children: data.children,
    list: data.list,
  });
}
