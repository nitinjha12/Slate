import ImageElement from "./Elements/Image";
import { useEffect, useRef, useMemo } from "react";
import { useSlate, useReadOnly } from "slate-react";
import { Editor, Transforms, Path } from "slate";
import React, { useState, useContext } from "react";
import ToggleList from "./Elements/ToggleList";
import Video from "./Elements/Video";
import Table from "./Elements/Table";
import HorizontalLine from "./Elements/Line";
import CaraouselItem from "components/Carousel/CaraouselItem";
import CarouselContainer from "components/Carousel/Container";
import { DragIndicator } from "@styled-icons/material-sharp/DragIndicator";
import { Plus } from "@styled-icons/bootstrap/Plus";
import { onMouseEnter } from "./Dragndrop";
import Context from "context/context";
import { findSlateNodePath, setNewSelection, findSlateNode } from "./findNode";
import Toolbar from "./Toolbar";

function DragIndicatorIcon({
  id,
  parentId,
}: {
  id: string;
  parentId?: string;
}) {
  const modelCtx = useContext(Context);
  const editor = useSlate();
  const readOnly = useReadOnly();
  const [, path] = findSlateNode(editor.children, id);

  return !readOnly ? (
    <>
      {/* {useMemo(
        () => ( */}
      <div
        className="toolbar__parent "
        style={{ display: "none" }}
        contentEditable={false}
      >
        <Toolbar />

        <button
          onMouseEnter={(e) =>
            onMouseEnter(e, editor as any, modelCtx.setDragPath, parentId)
          }
          className="toolbar__dragndrop ele-tooltip"
          data-id={id}
          data-tooltip="Drag to move 	&#xa; Click to open menu"
          onClick={() => {
            path &&
              Transforms.setNodes(
                editor,
                {
                  class: "editor__element--parent activenode__element",
                } as any,
                { at: path }
              );
            modelCtx.setSelectedBlock(true);
          }}
        >
          <DragIndicator
            className={`dragIndicator__icon ${
              modelCtx.isLight ? "mode--light" : "mode--dark"
            }`}
            size="20"
          />
        </button>
      </div>
      {/* ),
        []
      )} */}
    </>
  ) : (
    <span style={{ display: "none" }}></span>
  );
}

const hoverHandler = function (id: string, parentId?: string) {
  const modelCtx = useContext(Context);

  return {
    onMouseEnter(e: React.MouseEvent<HTMLElement>) {
      if (
        e.currentTarget.parentElement?.classList.contains(
          "gridLayout__children"
        )
      ) {
        return;
      }

      e.currentTarget.setAttribute("draggable", "true");

      const dragBtn: any = e.currentTarget.childNodes[0];
      dragBtn.style.display = "flex";

      modelCtx.setKey({ id, parentId });

      // e.currentTarget!.addEventListener("dragstart", () => {
      //   e.currentTarget?.classList.add("draggable--dragging");
      // });

      // e.currentTarget!.addEventListener("dragend", () => {
      //   e.currentTarget?.classList.remove("draggable--dragging");
      // });
    },
    onMouseLeave(e: React.MouseEvent) {
      e.currentTarget.setAttribute("draggable", "false");

      const dragBtn: any = e.currentTarget.childNodes[0];
      dragBtn.style.display = "none";
    },
    onPointerDown(e: React.MouseEvent) {
      const dragBtn: any = e.currentTarget.childNodes[0];
      dragBtn.style.display = "flex";
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
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 heading-1 ${props.element.class}`}
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h1
          {...props.attributes}
          className=""
          data-placeholder="Heading 1"
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
        className={`draggableItems my-2 ${props.element.class}`}
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h2
          {...props.attributes}
          className="heading-2"
          data-placeholder="Heading 2"
        >
          {props.children}
        </h2>
      </div>
    );
  },
  Heading3(props: any) {
    return (
      <div
        className={`draggableItems my-2 ${props.element.class}`}
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <h3
          {...props.attributes}
          className="heading-3"
          data-placeholder="Heading 3"
        >
          {props.children}
        </h3>
      </div>
    );
  },
  BulletedList(props: any) {
    return (
      <div
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <HorizontalLine {...props} />
      </div>
    );
  },
  LeftAlign(props: any) {
    return (
      <div
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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
          className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems   ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`gridLayout ${props.element.class}`}
        data-id={props.element.key}
      >
        {props.children}
      </section>
    );
  },
  GridLayoutChildren(props: any) {
    const readonly = useReadOnly();

    return (
      <>
        <div
          className="draggableItems gridLayout--dragItem"
          {...hoverHandler(props.element.key, props.element.parentKey)}
          data-id={props.element.key}
          style={{
            width: props.element.width + "%",
          }}
        >
          <DragIndicatorIcon
            id={props.element.key}
            parentId={props.element.parentKey}
          />

          <div
            className="gridLayout__children"
            {...props.attributes}
            style={{
              // border: readonly ? "none" : "1px solid black",

              position: "relative",
            }}
          >
            {props.children}
          </div>
        </div>
        {props.element.line && !readonly && (
          <div className="gridLayout__children--verticalLine"></div>
        )}
      </>
    );
  },

  Carousel(props: any) {
    // console.log(props);
    return (
      <div
        className={`draggableItems my-2 ${props.element.class}`}
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
        className={`draggableItems my-2 ${props.element.class}`}
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

  Container(props: any) {
    return (
      <div
        className={`draggableItems my-2 ${props.element.class}`}
        {...hoverHandler(props.element.key)}
        data-id={props.element.key}
      >
        <DragIndicatorIcon id={props.element.key} />

        <div className="element__container">{props.children}</div>
      </div>
    );
  },
};

export default Element;
