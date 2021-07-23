import { EditorType } from "types";
import { useState, useRef, useCallback, useEffect } from "react";
import areEqual from "deep-equal";

function useSelection(editor: EditorType) {
  const [selection, setSelection] = useState(editor.selection);

  const previousSelection = useRef(null) as any;

  useEffect(() => {
    setSelection(editor.selection);
  }, [editor.selection]);

  const setSelectionOptimized = useCallback(
    (newSelection) => {
      if (areEqual(selection, newSelection)) {
        return;
      }
      previousSelection.current = selection;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [previousSelection.current, selection, setSelectionOptimized];
}

export default useSelection;
