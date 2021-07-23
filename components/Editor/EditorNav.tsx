import React from "react";
import { Pencil } from "@styled-icons/bootstrap/Pencil";
import { Eye } from "@styled-icons/evil/Eye";

function EditorNav({ isWriting, setWriting }: any) {
  return (
    <nav className="editornav">
      <ul className="editornav__ul">
        <li
          onClick={() => setWriting(true)}
          className={`editornav__list ${isWriting && "editornav--active"}`}
        >
          <Pencil size="18" className={`editornav__icon `} />
          Write
        </li>
        <li
          onClick={() => setWriting(false)}
          className={`editornav__list ${!isWriting && "editornav--active"}`}
        >
          <Eye size="20" className="editornav__icon" />
          Preview
        </li>
      </ul>
    </nav>
  );
}

export default EditorNav;
