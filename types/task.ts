import { Editor, Path } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
import React from "react";

interface AnyObjecct {
  [key: string]: any;
}

export type EditorType<TEditor = AnyObjecct> = Editor &
  ReactEditor &
  HistoryEditor &
  TEditor;

export interface EditorInterface {
  editor: EditorType;
  value?: string;
  type?: string;
  mark?: boolean;
}

export interface ToolbarButtonDataInterface {
  onMouseDown(
    e:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.PointerEvent<HTMLSelectElement>,
    editor: EditorType,
    path?: Path
  ): void;
  children: any;
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
