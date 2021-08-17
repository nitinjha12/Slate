import React, { useContext, useState, useRef, useEffect } from "react";
import Context from "context/context";
import { ReactEditor } from "slate-react";
import { Transforms, Path, Editor } from "slate";
import CustomEditor from "components/Editor/Editor";
import { v4 as uuidv4 } from "uuid";

const useImageHandler = function () {
  const dataCtx = useContext(Context);

  const editor = dataCtx.data.editor;
  const previousSelection = useRef(null) as any;

  useEffect(() => {
    if (editor?.selection) {
      previousSelection.current = editor.selection;
    }
  }, [editor?.selection]);

  const imageClickHandler = function (e: React.MouseEvent, value: string) {
    e.preventDefault();

    if (editor && previousSelection.current) {
      ReactEditor.focus(editor);

      Transforms.insertNodes(
        editor!,

        {
          type: "image",
          caption: "",
          key: uuidv4(),
          src: value,
          children: [{ text: "" }],
          style: { width: "100%" },
        } as any,
        { at: previousSelection.current, select: true }
      );
    }

    editor?.onChange();
  };

  return { imageClickHandler };
};

export default useImageHandler;
