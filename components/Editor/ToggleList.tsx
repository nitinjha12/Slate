import { useState } from "react";
import { ToggleListStyle } from "styles/block";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";

// interface ToggleListInterface {
//   title: string;
//   description: string;
// }

function ToggleList({ element, attributes, children }: any) {
  const [toggle, setToggle] = useState(false);
  const [description, setDescription] = useState<string>(element.description);

  return (
    <ToggleListStyle className={toggle ? "pb-3" : ""} {...attributes}>
      <div
        className="faq__title"
        onClick={() => setToggle((tog) => !tog)}
        aria-controls="collapse-text"
        aria-expanded={toggle}
      >
        <span>{children}</span>
        <ChevronDown
          size="28"
          style={
            toggle
              ? { transform: "rotate(-180deg)", transition: "all 0.5s" }
              : { transform: "rotate(0deg)", transition: "all 0.5s" }
          }
          className="faq__downArrow"
        />
      </div>

      {toggle && (
        <span
          id="collapse-text"
          onChange={(e) => setDescription(e.currentTarget.innerText)}
        >
          {description}
        </span>
      )}
    </ToggleListStyle>
  );
}

export default ToggleList;
