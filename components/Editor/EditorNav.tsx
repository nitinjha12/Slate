import { useContext } from "react";
import { Pencil } from "@styled-icons/bootstrap/Pencil";
import { Eye } from "@styled-icons/evil/Eye";
import { SunFill } from "@styled-icons/bootstrap/SunFill";
import { MoonFill } from "@styled-icons/bootstrap/MoonFill";
import { GridView } from "@styled-icons/material-outlined/GridView";
import Context from "context/context";

function EditorNav({ isWriting, setWriting }: any) {
  const lightCtx = useContext(Context);

  return (
    <nav className={`editornav ${lightCtx.isLight ? "light" : "drak"}`}>
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
        <li className="editornav__list">
          {lightCtx.isLight ? (
            <SunFill
              size="20"
              className="editornav--active"
              onClick={() => lightCtx.changeTheme(false)}
            />
          ) : (
            <MoonFill
              size="20"
              className="editornav--active"
              onClick={() => lightCtx.changeTheme(true)}
            />
          )}
        </li>
        <li
          className={`editornav__list ${
            lightCtx.colLayout && "editornav--active"
          }`}
          onClick={() => lightCtx.setColLayout(!lightCtx.colLayout)}
        >
          <GridView size="30" />
        </li>
      </ul>
    </nav>
  );
}

export default EditorNav;
