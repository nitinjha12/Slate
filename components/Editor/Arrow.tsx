import React from "react";
import { Arrow90degUp } from "@styled-icons/bootstrap/Arrow90degUp";
import { ArrowHookUpLeft } from "@styled-icons/fluentui-system-filled/ArrowHookUpLeft";
import { Transforms, Path, Range, Point } from "slate";
import { useSlateStatic } from "slate-react";

function Arrow({ isSelected, isHover }: any) {
  const editor = useSlateStatic();

  function clickHandler(e: React.MouseEvent, prev = false) {
    const block = { type: "paragraph", children: [{ text: "" }] };

    if (prev) {
      const newEditor = JSON.parse(JSON.stringify(editor));
      newEditor.selection.anchor.path[0]--;
      newEditor.selection.focus.path[0]--;

      console.log(
        editor.selection?.anchor.path,
        newEditor.selection.focus.path
      );

      Transforms.setSelection(editor, newEditor.selection);

      Transforms.insertNodes(editor, block);
      return;
    }
    console.log(editor.selection);
    Transforms.insertNodes(editor, block);
  }

  return (
    <div className="elementPara">
      <div
        className="elementPara--top"
        style={{
          background: isSelected ? "#006cfa" : isHover ? "#a1c8fd" : "",
          display: isSelected ? "flex" : isHover ? "flex" : "none",
        }}
        onClick={(e) => isSelected && clickHandler(e, true)}
      >
        <Arrow90degUp size="12" />
      </div>
      <div
        className="elementPara--bottom"
        style={{
          background: isSelected ? "#006cfa" : isHover ? "#a1c8fd" : "",
          display: isSelected ? "flex" : isHover ? "flex" : "none",
        }}
        onClick={(e) => isSelected && clickHandler(e)}
      >
        <Arrow90degUp size="12" />
      </div>
    </div>
  );
}

export default Arrow;
