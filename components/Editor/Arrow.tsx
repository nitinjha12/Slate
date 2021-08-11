import { useState } from "react";
import { Arrow90degUp } from "@styled-icons/bootstrap/Arrow90degUp";
import { ArrowHookUpLeft } from "@styled-icons/fluentui-system-filled/ArrowHookUpLeft";
import { Transforms, Path, Range, Point, Node } from "slate";
import { useSlateStatic, ReactEditor } from "slate-react";
import { v4 as uuidv4 } from "uuid";
import { findSlateNode } from "./findNode";

function Arrow({ isSelected, isHover, id }: any) {
  const editor = useSlateStatic();
  const [isArrowHover, setArrowHover] = useState();

  function clickHandler(e: React.MouseEvent, prev = false) {
    const block = {
      type: "paragraph",
      children: [{ text: "" }],
      key: uuidv4(),
    };

    const node = findSlateNode(editor.children, id);
    const path = ReactEditor.findPath(editor as any, node);
    const nextPath = [path[0] + 1];
    const range: Range = {
      anchor: { path, offset: 0 },
      focus: { path, offset: 0 },
    };

    if (prev) {
      Transforms.insertNodes(editor, block, { at: path });
    } else {
      range.anchor.path = nextPath;
      range.focus.path = nextPath;
      Transforms.insertNodes(editor, block, { at: nextPath });
    }

    Transforms.setSelection(editor as any, range);
    ReactEditor.focus(editor as any);
  }

  return (
    <div className="elementPara">
      {arrowData.map((data, i) => (
        <div
          key={i}
          className={data.class}
          style={{
            background:
              isSelected && isHover && isArrowHover
                ? "#006cfa"
                : isHover
                ? "#a1c8fd"
                : "",
            display: isSelected && isHover ? "flex" : isHover ? "flex" : "none",
          }}
          onClick={(e) => isSelected && clickHandler(e, data.prev)}
        >
          <Arrow90degUp size="12" />
        </div>
      ))}
    </div>
  );
}

export default Arrow;

const arrowData = [
  {
    prev: true,
    class: "elementPara--top",
  },
  {
    prev: false,
    class: "elementPara--bottom",
  },
];
