import ImageElement from "./Elements/Image";
import { useEffect } from "react";
import {
  useSelected,
  useFocused,
  ReactEditor,
  useSlate,
  useSlateStatic,
  useReadOnly,
} from "slate-react";
import { Editor, Transforms } from "slate";
import React, { useState, useContext } from "react";
import ToggleList from "./ToggleList";
import Video from "./Elements/Video";
import Table from "./Elements/Table";
import CaraouselItem from "components/Carousel/CaraouselItem";
import CarouselContainer from "components/Carousel/Container";
import { DragIndicator } from "@styled-icons/material-sharp/DragIndicator";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { onMouseEnter } from "./Dragndrop";
import Context from "context/context";
import { findSlateNodePath, setNewSelection } from "./findNode";

function DragIndicatorIcon({ id }: { id: string }) {
  const modelCtx = useContext(Context);
  const editor = useSlate();
  const readOnly = useReadOnly();

  return !readOnly ? (
    <>
      <div
        className="toolbar__parent "
        style={{ display: "none" }}
        contentEditable={false}
      >
        <button
          className="toolbar__addButton toolbar__addButton--hover"
          onClick={(e) => {
            setNewSelection(editor as any, id);
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement?.classList.add(
              "toolbar__parent--drag"
            );
          }}
        >
          <Plus size="24" />
        </button>
        <button
          onMouseEnter={(e) =>
            onMouseEnter(e, editor as any, modelCtx.setDragPath)
          }
          className="toolbar__dragndrop"
          data-id={id}
        >
          <DragIndicator
            className={`dragIndicator__icon ${
              modelCtx.isLight ? "mode--light" : "mode--dark"
            }`}
            size="20"
            color="black"
          />
        </button>
      </div>
    </>
  ) : (
    <span style={{ display: "none" }}></span>
  );
}

const hoverHandler = function (id: string) {
  const editor = useSlate();
  const hoverNodePath = findSlateNodePath(editor as any, id);

  return {
    onMouseEnter(e: React.MouseEvent<HTMLElement>) {
      e.currentTarget.setAttribute("draggable", "true");
      const dragBtn: any = e.currentTarget.childNodes[0];
      dragBtn.style.display = "inline-block";
      const addBtn: any = e.currentTarget.childNodes[0].childNodes[0];

      if (
        hoverNodePath &&
        editor.selection?.anchor.path[0] === hoverNodePath[0]
      ) {
        dragBtn.classList.add("toolbar__parent--drag");
        addBtn.style.display = "none";
      }

      e.currentTarget!.addEventListener("dragstart", () => {
        e.currentTarget?.classList.add("draggable--dragging");
      });

      e.currentTarget!.addEventListener("dragend", () => {
        e.currentTarget?.classList.remove("draggable--dragging");
      });
    },
    onMouseLeave(e: React.MouseEvent) {
      e.currentTarget.setAttribute("draggable", "false");

      const dragBtn: any = e.currentTarget.childNodes[0];
      const addBtn: any = e.currentTarget.childNodes[0].childNodes[0];
      dragBtn.style.display = "none";
      dragBtn.classList.remove("toolbar__parent--drag");
      addBtn.style.display = "inline-block";
    },
    onPointerDown(e: React.MouseEvent) {
      const dragBtn: any = e.currentTarget.childNodes[0];
      dragBtn.style.display = "inline-block";
      const addBtn: any = e.currentTarget.childNodes[0].childNodes[0];

      dragBtn.classList.add("toolbar__parent--drag");
      addBtn.style.display = "none";
    },
  };
};

const Element = {
  Anchor(props: any) {
    return (
      <a {...props.attributes} href={props.element.url}>
        {props.children}
      </a>
    );
  },
  Code(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div
          className="code__container "
          {...props.attributes}
          data-id={props.element.key}
        >
          <code>{props.children}</code>
        </div>
      </div>
    );
  },
  Heading1(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h1
          {...props.attributes}
          className=""
          style={{ fontSize: "2em", fontWeight: "bold" }}
        >
          {props.children}
        </h1>
      </div>
    );
  },
  Heading2(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h2 {...props.attributes} className="">
          {props.children}
        </h2>
      </div>
    );
  },
  Heading3(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h3 {...props.attributes} className="">
          {props.children}
        </h3>
      </div>
    );
  },
  BulletedList(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <ul {...props.attributes} className="">
          {props.children}
        </ul>
      </div>
    );
  },
  OrderedList(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <ol {...props.attributes} className="">
          {props.children}
        </ol>
      </div>
    );
  },
  ToggleList(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <ToggleList {...props} />
      </div>
    );
  },
  BoldText(props: any) {
    return <strong {...props.attributes}>{props.children}</strong>;
  },

  ListItem(props: any) {
    return (
      <li {...props.attributes} className="">
        {props.children}
      </li>
    );
  },

  Line(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div
          {...props.attributes}
          style={{ display: "flow-root" }}
          contentEditable={false}
          className=" hr--line"
        >
          <hr
            style={{
              display: "flow-root",
              height: "3px",
              backgroundColor: "#E6E9EF",
              margin: "1rem 0",
              border: "0px",
              borderRadius: "3px",
            }}
          />
          <span style={{ display: "none" }}>{props.children}</span>
        </div>
      </div>
    );
  },
  LeftAlign(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div style={{ textAlign: "left" }} className="" {...props.attributes}>
          {props.children}
        </div>
      </div>
    );
  },
  CenterAlign(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div style={{ textAlign: "center" }} className="" {...props.attributes}>
          {props.children}
        </div>
      </div>
    );
  },
  RightAlign(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div style={{ textAlign: "right" }} className="" {...props.attributes}>
          {props.children}
        </div>
      </div>
    );
  },

  Link(props: any) {
    return (
      <a {...props.attributes} href={props.element.url}>
        {props.children}
      </a>
    );
  },

  Image(props: any) {
    return (
      <>
        <div
          className="draggableItems my-2"
          {...hoverHandler(props.element.key)}
          data-id={props.element.key}
        >
          <DragIndicatorIcon id={props.element.key} />

          <ImageElement {...props} />
        </div>
      </>
    );
  },
  Video(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <Video {...props} />
      </div>
    );
  },
  Table(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />
        <Table {...props} />
      </div>
    );
  },
  TableHead(props: any) {
    return <thead {...props.attributes}>{props.children}</thead>;
  },
  TableBody(props: any) {
    return <tbody {...props.attributes}>{props.children}</tbody>;
  },
  TableRow(props: any) {
    return <tr {...props.attributes}>{props.children}</tr>;
  },
  TableColumn(props: any) {
    return (
      <td
        {...props.attributes}
        colSpan={props.element.colSpan}
        rowSpan={props.element.rowSpan}
        style={props.element.display ? {} : { display: "none" }}
        className="element__tableCell"
      >
        {props.children}
      </td>
    );
  },

  GridLayout(props: any) {
    return (
      <section
        {...props.attributes}
        className="gridLayout"
        data-id={props.element.key}
      >
        {props.children}
      </section>
    );
  },
  GridLayoutChildren(props: any) {
    // console.log(props);
    const readonly = useReadOnly();

    return (
      <>
        <div
          className="draggableItems my-2 gridLayout--dragItem"
          {...hoverHandler(props.element.key)}
          data-id={props.element.key}
          style={{
            width: props.element.width + "%",
            // paddingLeft: "40px",
          }}
        >
          <DragIndicatorIcon id={props.element.key} />

          <div
            className="gridLayout__children"
            {...props.attributes}
            style={{
              border: readonly ? "none" : "1px solid black",
              position: "relative",
            }}
          >
            {props.children}
          </div>
        </div>
        {props.element.line && <div className=""></div>}
      </>
    );
  },

  Carousel(props: any) {
    // console.log(props);
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />
        <CarouselContainer {...props} />
      </div>
    );
  },
  CarouselItem(props: any) {
    return <CaraouselItem {...props} />;
  },

  ParaGraph(props: any) {
    return (
      <div
        className="draggableItems my-2"
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <p {...props.attributes} className="">
          {props.children}
        </p>
      </div>
    );
  },
};

export default Element;

export const Leaf = function (props: any) {
  let el = <>{props.children}</>;

  if (props.leaf.leafCode) {
    el = <code>{el}</code>;
  }

  const DefaultLeaf = (props: any) => (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration:
          props.leaf.underline && props.leaf.strikeThrough
            ? "underline line-through"
            : props.leaf.strikeThrough
            ? "line-through"
            : props.leaf.underline && "underline",
        verticalAlign: props.leaf.super ? "super " : props.leaf.sub && "sub",
      }}
    >
      {el}
    </span>
  );

  // if (props.leaf.placeholder) {
  //   return (
  //     <>
  //       <DefaultLeaf {...props} />
  //       <span
  //         style={{ opacity: 0.8, position: "absolute", top: 0, color: "black" }}
  //         contentEditable={false}
  //       >
  //         Type / to open menu
  //       </span>
  //     </>
  //   );
  // }

  return <DefaultLeaf {...props} />;

  // if (props.leaf.bold) {
  //   el = <strong>{el}</strong>;
  // }

  // if (props.leaf.code) {
  //   el = <code>{el}</code>;
  // }

  // if (props.leaf.italic) {
  //   el = <em>{el}</em>;
  // }

  // if (props.leaf.underline) {
  //   el = <u>{el}</u>;
  // }

  // if (props.leaf.strikeThrough) {
  //   el = <del>{el}</del>;
  // }

  // if (props.leaf.super) {
  //   el = <sup>{el}</sup>;
  // }

  // if (props.leaf.sub) {
  //   el = <sub>{el}</sub>;
  // }
};
