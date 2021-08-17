import React, { useEffect, useRef, useState, useCallback } from "react";
import { Editor, Transforms, Range, Element } from "slate";
import isUrl from "is-url";
import { Check2 } from "@styled-icons/bootstrap/Check2";
import { Cross } from "@styled-icons/entypo/Cross";
import { EditAlt } from "@styled-icons/boxicons-regular/EditAlt";
import { Unlink } from "@styled-icons/foundation/Unlink";
import CustomEditor from "./Editor";
import { EditorType } from "types";
import { EmbedUrl } from "./EmbedUrl";
import { useContext } from "react";
import Context from "context/context";
// import { useSlate } from "slate-react";

export function LinkEditor({
  editor,
  selectionForLink,
  toolbarRef,
  imageLink = false,
  setActiveLink,
}: any) {
  const [active, setActive] = useState(true);
  const [showLink, setShowLink] = useState(false);

  let linkNodeEdit = Editor.above(editor, {
    at: selectionForLink,
    match: (n: any) => n.type === "link",
  }) as any;

  if (imageLink) {
    [linkNodeEdit] = Editor.nodes(editor, {
      match: (n: any) => n.type === "image",
    }) as any;
  }

  const [linkNode, path] = linkNodeEdit ? linkNodeEdit : [];

  useEffect(() => {
    if (editor.selection && Range.isCollapsed(editor.selection)) {
      setActive(true);
    }
  }, [editor.selection, linkNode]);

  const [linkURL, setLinkURL] = useState<string>(linkNode?.url || "");

  useEffect(() => {
    setLinkURL(linkNode?.url || "");
    if (
      (imageLink && linkNode?.url) ||
      (linkNode?.url !== "https://google.com" && linkNode?.url)
    ) {
      setShowLink(true);
    } else {
      setShowLink(false);
    }
  }, [linkNode]);

  const onLinkURLChange = useCallback(
    (event) => setLinkURL(event.target.value),

    []
  );

  const onApply = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isUrl(linkURL)) {
      Transforms.setNodes(editor, { url: linkURL } as any, { at: path });
      setActive(false);
      imageLink && setActiveLink(false);
    } else setLinkURL("Use Url");

    toolbarRef && toolbarRef.current.classList.add("element--hide");
  };

  function EditHandler(e: React.MouseEvent) {
    e.preventDefault();

    setShowLink(false);
  }

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(false);
    toolbarRef && toolbarRef.current.classList.add("element--hide");
    imageLink && setActiveLink(false);
  };

  function removeLink(e: React.MouseEvent) {
    e.preventDefault();

    if (imageLink) {
      Transforms.setNodes(editor, { url: "" } as any, { at: path });
      setActive(false);
      setActiveLink(false);
    }

    CustomEditor.toggleLinkAtSelection(editor);
  }

  return active ? (
    !showLink ? (
      <form
        className="selectToolbar__linkEditor"
        // style={imageLink ? { paddingTop: "0px" } : {}}
      >
        <input
          className="input__style"
          value={linkURL}
          type="text"
          onChange={onLinkURLChange}
          // onClick={(e) => e.currentTarget.focus()}
        />
        <button
          className="link__btn link--blue"
          onClick={onApply}
          onPointerDown={onApply}
        >
          <Check2 size="18" />
        </button>
        <button className="link__btn link--red" onPointerDown={onCancel}>
          <Cross size="18" />
        </button>
      </form>
    ) : (
      <div
        className="link__preview "
        style={
          imageLink ? { padding: "0px 5px 0px 0px", borderRadius: "5px" } : {}
        }
      >
        <a href={linkNode?.url} target="_blank">
          {linkNode?.url}
        </a>
        <button className="link__btn link--white" onPointerDown={EditHandler}>
          <EditAlt size="18" />
        </button>
        <button className="link__btn link--white" onPointerDown={removeLink}>
          <Unlink size="18" />
        </button>
      </div>
    )
  ) : null;
}

export function VideoEditor({ editor, setVideoEditor, removeToolbar }: any) {
  const [linkUrl, setLinkUrl] = useState("");
  const previousSelection = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editor && editor.selection) {
      previousSelection.current = editor;
    }
    inputRef.current && inputRef.current.focus();
  }, [editor, inputRef]);

  function onApply(e: React.MouseEvent) {
    e.preventDefault();

    if (isUrl(linkUrl)) {
      CustomEditor.AddingVideoSrc(previousSelection.current, linkUrl);
      setVideoEditor(false);
      removeToolbar();
    } else {
      setLinkUrl("Url is not valid");
    }
  }

  function onCancel(e: React.MouseEvent) {
    e.preventDefault();
    setVideoEditor(false);
    removeToolbar();
  }

  return (
    <section className="videoEditor">
      <form className="selectToolbar__linkEditor">
        <input
          ref={inputRef}
          className="input__style"
          value={linkUrl}
          type="text"
          onChange={(e) => setLinkUrl(e.target.value)}
        />
        <button
          className="link__btn link--blue"
          onClick={onApply}
          onPointerDown={onApply}
        >
          <Check2 size="20" />
        </button>
        <button className="link__btn link--red" onPointerDown={onCancel}>
          <Cross size="20" />
        </button>
      </form>
      <span>Paste The Media URL In Input.</span>
    </section>
  );
}

export function TableView({ editor, setTable, removeToolbar }: any) {
  const [dimension, setDimension] = useState({ row: 0, column: 0 });
  const lightCtx = useContext(Context);
  const tableBoxes: JSX.Element[] = [];
  let key = 0;

  const clickHandler = function () {
    CustomEditor.insertTable(editor, {
      row: dimension.row,
      column: dimension.column,
    });

    setTable(false);
    removeToolbar();
  };

  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      tableBoxes.push(
        <div
          className="table__box"
          data-row={i}
          data-column={j}
          onMouseMove={tableHoverHandler}
          key={key}
        ></div>
      );
      key++;
    }
  }

  function tableHoverHandler(e: React.SyntheticEvent<HTMLDivElement>) {
    const boxCell = document.querySelectorAll(".table__box");

    const { row, column } = e.currentTarget.dataset;

    setDimension({ row: +row!, column: +column! });

    boxCell.forEach((cell) => {
      if (
        +cell.getAttribute("data-row")! <= Number(row) &&
        +cell.getAttribute("data-column")! <= Number(column)
      ) {
        cell.classList.add("table__box--active");
      } else {
        cell.classList.remove("table__box--active");
      }
    });
  }
  return (
    <div className={`tableView ${lightCtx.isLight ? "" : "dark"}`}>
      <div className="table__boxContainer" onPointerDown={clickHandler}>
        {tableBoxes.map((table) => table)}
      </div>
      <div className="table__dimension">
        <span>{dimension.row}</span> ×<span> {dimension.column}</span>
      </div>
    </div>
  );
}

// export function GridLayout({ setLayout, editor }: any) {
//   const gridOptionArr = [2, 3];

//   function clickHandler(e: React.MouseEvent, num: number) {
//     setLayout(false);

//     CustomEditor.addGridLayout(editor, num);
//   }

//   return (
//     <section className=" gridLayout__sizeoptions">
//       {gridOptionArr.map((num) => (
//         <button
//           key={num}
//           className="grid--btn"
//           onClick={(e) => clickHandler(e, num)}
//         >
//           {num}
//         </button>
//       ))}
//     </section>
//   );
// }

// export default GridLayout;
