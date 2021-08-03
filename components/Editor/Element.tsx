import ImageElement from "./Elements/Image";
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
import { onMouseEnter } from "./Dragndrop";
import Context from "context/context";

function DragIndicatorIcon() {
  const modelCtx = useContext(Context);
  const editor = useSlate();
  const readOnly = useReadOnly();

  return !readOnly ? (
    <button
      className="toolbar__dragndrop"
      onMouseEnter={(e) => onMouseEnter(e, editor as any, modelCtx.setDragPath)}
      style={{ display: "none" }}
      contentEditable={false}
    >
      <DragIndicator
        className={`dragIndicator__icon ${
          modelCtx.isLight ? "mode--light" : "mode--dark"
        }`}
        size="20"
        color="black"
      />
    </button>
  ) : (
    <span style={{ display: "none" }} className="toolbar__dragndrop"></span>
  );
}

const hoverHandler = {
  onMouseEnter(e: React.MouseEvent) {
    e.currentTarget.setAttribute("draggable", "true");

    // function

    // console.log(node);

    e.currentTarget!.addEventListener("dragstart", () => {
      e.currentTarget?.classList.add("draggable--dragging");
    });

    e.currentTarget!.addEventListener("dragend", () => {
      e.currentTarget?.classList.remove("draggable--dragging");
    });

    const dragBtn: any = e.currentTarget.childNodes[0];
    dragBtn.style.display = "inline-block";
  },
  onMouseLeave(e: React.MouseEvent) {
    e.currentTarget.setAttribute("draggable", "false");

    const dragBtn: any = e.currentTarget.childNodes[0];
    dragBtn.style.display = "none";
  },
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
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <div className="code__container " {...props.attributes}>
          <code>{props.children}</code>
        </div>
      </div>
    );
  },
  Heading1(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

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
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <h2 {...props.attributes} className="">
          {props.children}
        </h2>
      </div>
    );
  },
  Heading3(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <h3 {...props.attributes} className="">
          {props.children}
        </h3>
      </div>
    );
  },
  BulletedList(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <ul {...props.attributes} className="">
          {props.children}
        </ul>
      </div>
    );
  },
  OrderedList(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <ol {...props.attributes} className="">
          {props.children}
        </ol>
      </div>
    );
  },
  ToggleList(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

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
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

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
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <div style={{ textAlign: "left" }} className="" {...props.attributes}>
          {props.children}
        </div>
      </div>
    );
  },
  CenterAlign(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <div style={{ textAlign: "center" }} className="" {...props.attributes}>
          {props.children}
        </div>
      </div>
    );
  },
  RightAlign(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

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
        <div className="draggableItems my-2" {...hoverHandler}>
          <DragIndicatorIcon />

          <ImageElement {...props} />
        </div>
      </>
    );
  },
  Video(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

        <Video {...props} />
      </div>
    );
  },
  Table(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />
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
      <section {...props.attributes} className="gridLayout">
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
          {...hoverHandler}
          style={{
            width: props.element.width + "%",
            // paddingLeft: "40px",
          }}
        >
          <DragIndicatorIcon />

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
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />
        <CarouselContainer {...props} />
      </div>
    );
  },
  CarouselItem(props: any) {
    return <CaraouselItem {...props} />;
  },

  ParaGraph(props: any) {
    return (
      <div className="draggableItems my-2" {...hoverHandler}>
        <DragIndicatorIcon />

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
