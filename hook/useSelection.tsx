import React, { useContext, useState, useRef, useEffect } from "react";
import Context from "context/context";
import { ReactEditor } from "slate-react";
import { Transforms, Path, Editor } from "slate";
import CustomEditor from "components/Editor/Editor";

const useSelection = function () {
  const dataCtx = useContext(Context);

  const editor = dataCtx.data.editor;
  const previousSelection = useRef(null) as any;

  useEffect(() => {
    if (editor?.selection) {
      previousSelection.current = editor.selection;
    }
  }, [editor?.selection]);

  return previousSelection.current;
};

export default useSelection;
