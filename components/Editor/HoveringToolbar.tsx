import React, { useRef, useState, useEffect } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Range, Editor } from "slate";
import { hoveringToolbarData } from "./data";
import { isLinkNodeAtSelection } from "./helper";
import { LinkEditor } from "./SelectEditor";

function HoveringToolbar() {
  const editor = useSlate() as any;

  if (editor.selection && !Range.isCollapsed(editor.selection)) {
    const toolbarRef = useRef<HTMLDivElement>(null);

    const focusedRef = useRef({ top: 0, left: 0 });
    const previousSelection = useRef(null) as any;
    let selectionForLink: any = null;

    if (isLinkNodeAtSelection(editor, editor.selection)) {
      selectionForLink = editor.selection;
    }

    if (
      !editor.selection &&
      isLinkNodeAtSelection(editor, previousSelection.current)
    ) {
      selectionForLink = previousSelection.current;
    }

    useEffect(() => {
      const el = toolbarRef.current;

      if (editor.selection) {
        previousSelection.current = editor.selection;
      }

      if (!el) {
        return;
      }

      if (
        (!editor.selection ||
          !ReactEditor.isFocused(editor) ||
          Range.isCollapsed(editor.selection) ||
          Editor.string(editor, editor.selection) === "") &&
        !selectionForLink
      ) {
        el.classList.add("element--hide");
        return;
      } else {
        el.classList.remove("element--hide");
      }

      const domSelection = window.getSelection();
      const domRange = domSelection!.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();

      if (rect.top > 0) {
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${
          rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
        }px`;
      }

      const topNum = Number.parseFloat(el.style.top);
      const leftNum = Number.parseFloat(el.style.left);

      if (topNum > 0 && leftNum < 0) {
        focusedRef.current.top = topNum;
        focusedRef.current.left = Math.abs(leftNum);
      }

      if (topNum > 0 && leftNum > 0) {
        focusedRef.current.top = topNum;
        focusedRef.current.left = leftNum;
      }

      if (selectionForLink === previousSelection.current) {
        el.style.top = `${focusedRef.current.top}px`;
        el.style.left = `${focusedRef.current.left}px`;
      }

      if (el.getBoundingClientRect().x < 10) {
        el.style.left = `${leftNum + el.clientWidth / 3}px`;
      }

      if (el.getBoundingClientRect().x + el.clientWidth > window.innerWidth) {
        el.style.left = `${
          Number.parseFloat(el.style.left) - el.clientWidth / 2
        }px`;
      }
    }, [editor.selection]);

    return (
      <div className="toolbar hoveringToolbar element--hide" ref={toolbarRef}>
        {selectionForLink && (
          <LinkEditor
            selectionForLink={selectionForLink}
            editor={editor}
            toolbarRef={toolbarRef}
          />
        )}

        {!selectionForLink &&
          hoveringToolbarData.map((data: any, i: any) => (
            <button
              key={i}
              onPointerDown={(e) => {
                data.onMouseDown(e, editor);
              }}
              className={`btn--toolbar toolbar__option hoveringToolbar__button ${
                data.isActive(editor) ? "btn--toolbar__active" : ""
              }`}
              style={data.style}
            >
              {data.children}
            </button>
          ))}
      </div>
    );
  } else {
    return <span style={{ display: "none" }}> </span>;
  }
}

export default HoveringToolbar;
