import React, { useState } from "react";
import { ToggleListStyle } from "styles/block";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { Transforms, Editor } from "slate";
import { useSlate, useReadOnly } from "slate-react";
import { Play } from "@styled-icons/boxicons-regular/Play";

// interface ToggleListInterface {
//   title: string;
//   description: string;
// }

function ToggleList({ element, attributes, children }: any) {
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState<string>(element.title || "");
  const editor = useSlate();
  const readonly = useReadOnly();

  // console.log(element.title);

  const titleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toggleListNode = Editor.nodes(editor, {
      match: (n: any) => {
        console.log(n);
        return n.type === "toggle-list";
      },
    });
    setTitle(e.target.value);

    console.log(toggleListNode);

    Transforms.setNodes(
      editor,
      {
        title: title,
      } as any,
      {
        match: (n: any) => {
          console.log(n);
          return n.type === "toggle-list";
        },
      }
    );
    // console.log(title);
  };

  return (
    <ToggleListStyle
      className={`faqStyle ${toggle ? "pb-3" : ""}`}
      {...attributes}
    >
      <div className="faq__title" contentEditable={false}>
        <Play
          size="28"
          style={
            toggle
              ? { transform: "rotate(-90deg)", transition: "all 0.2s" }
              : { transform: "rotate(0deg)", transition: "all 0.2s" }
          }
          className="faq__downArrow"
          onClick={() => setToggle((tog) => !tog)}
        />
        {!readonly ? (
          <input
            value={title}
            onChange={titleChangeHandler}
            className="faq__input"
          />
        ) : (
          // {/* {title} */}

          <input
            value={title}
            readOnly
            style={{ cursor: "default" }}
            className="faq__input"
          />
        )}
      </div>

      {toggle && <div className={`faq__toggleChildren`}>{children}</div>}
    </ToggleListStyle>
  );
}

export default ToggleList;
