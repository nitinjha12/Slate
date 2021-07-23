import { Editor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import React from "react";

export type EditorType = Editor & ReactEditor & HistoryEditor;

export interface EditorInterface {
  editor: EditorType;
  value?: string;
  type?: string;
  mark?: boolean;
}

export interface ToolbarButtonDataInterface {
  onMouseDown(
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.PointerEvent<HTMLSelectElement>,
    editor: EditorType
  ): void;
  children: JSX.Element | string;
  style?: any;
  name: string | undefined;
  title: string | undefined;
  isActive(editor: EditorType): boolean;
}

export interface customEditorDataArrInterface {
  editorData: { type?: string; value?: string };
  style?: React.CSSProperties;
  children: JSX.Element | string;
  markBlock: boolean;
}
