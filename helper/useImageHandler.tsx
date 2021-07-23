import React, { useContext, useState, useRef, useEffect } from "react";
import Context from "context/context";
import { ReactEditor } from "slate-react";
import { Transforms, Path, Editor } from "slate";
import CustomEditor from "components/Editor/Editor";

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

      const [parentNode, parentPath] = Editor.parent(
        editor,
        previousSelection.current.focus.path
      );

      console.log(parentNode);

      CustomEditor.toggleBlock({ editor, value: "image" });

      Transforms.insertNodes(
        editor!,
        [
          {
            type: "image",
            caption: "",
            // url: value,
            src: value,
            children: [{ text: "" }],
            style: { width: "100%" },
          },
          { type: "paragraph", children: [{ text: "" }] },
        ] as any,
        { at: previousSelection.current, select: true }
      );
    }
  };

  return { imageClickHandler };
};

export default useImageHandler;
