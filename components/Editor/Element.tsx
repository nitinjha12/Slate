import ImageElement from "./Image";
import {
  useSelected,
  useFocused,
  ReactEditor,
  useSlate,
  useSlateStatic,
  useReadOnly,
} from "slate-react";
import { Editor, Transforms } from "slate";
import TableToolbar from "./TableToolbar";
import { useState, useEffect } from "react";
import ToggleList from "./ToggleList";

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
      <div className="code__container my-2" {...props.attributes}>
        <code>{props.children}</code>
      </div>
    );
  },
  Heading1(props: any) {
    return (
      <h1
        {...props.attributes}
        className="my-2"
        style={{ fontSize: "2em", fontWeight: "bold" }}
      >
        {props.children}
      </h1>
    );
  },
  Heading2(props: any) {
    return (
      <h2 {...props.attributes} className="my-2">
        {props.children}
      </h2>
    );
  },
  Heading3(props: any) {
    return (
      <h3 {...props.attributes} className="my-2">
        {props.children}
      </h3>
    );
  },
  BulletedList(props: any) {
    return (
      <ul {...props.attributes} className="my-2">
        {props.children}
      </ul>
    );
  },
  OrderedList(props: any) {
    return (
      <ol {...props.attributes} className="my-2">
        {props.children}
      </ol>
    );
  },
  ToggleList(props: any) {
    return <ToggleList {...props} />;
  },
  BoldText(props: any) {
    return <strong {...props.attributes}>{props.children}</strong>;
  },

  ListItem(props: any) {
    return (
      <li {...props.attributes} className="my-2">
        {props.children}
      </li>
    );
  },

  Line(props: any) {
    return (
      <div
        {...props.attributes}
        style={{ display: "flow-root" }}
        contentEditable={false}
        className="my-2 hr--line"
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
    );
  },
  LeftAlign(props: any) {
    return (
      <div style={{ textAlign: "left" }} className="my-2" {...props.attributes}>
        {props.children}
      </div>
    );
  },
  CenterAlign(props: any) {
    return (
      <div
        style={{ textAlign: "center" }}
        className="my-2"
        {...props.attributes}
      >
        {props.children}
      </div>
    );
  },
  RightAlign(props: any) {
    return (
      <div
        style={{ textAlign: "right" }}
        className="my-2"
        {...props.attributes}
      >
        {props.children}
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
        <ImageElement {...props} />
      </>
    );
  },
  Video(props: any) {
    return (
      <div {...props.attributes} className="my-2" style={{ height: "100%" }}>
        <div
          contentEditable={false}
          style={{
            position: "relative",
            paddingTop: "40%",
            display: "block",
          }}
          className="videoContainer"
        >
          <iframe
            src={props.element.src}
            style={{
              position: "absolute",
              top: 0,
            }}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Video Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
          {props.children}
        </div>
      </div>
    );
  },

  Table(props: any) {
    const selected = useSelected();
    const focused = useFocused();
    const editor = useSlate();
    const [dropDown, setDropdown] = useState(true);

    return (
      <section className="my-2 table--block">
        {selected && (
          <TableToolbar
            editor={editor}
            focused={focused}
            dropDown={dropDown}
            setDropdown={setDropdown}
          />
        )}
        <table
          style={{ width: "100%" }}
          className="render__table"
          {...props.attributes}
          onPointerDown={() => setDropdown(false)}
        >
          {props.children}
        </table>
      </section>
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
    return <td {...props.attributes}>{props.children}</td>;
  },

  GridLayout(props: any) {
    return (
      <section
        {...props.attributes}
        className="my-2 gridLayout"
        onKeyDown={(e) => console.log(e.key)}
      >
        {props.children}
      </section>
    );
  },
  GridLayoutChildren(props: any) {
    // console.log(props);

    const editor = useSlate();
    const readonly = useReadOnly();

    // console.log(editor.selection);

    const path = editor.selection?.anchor.path;
    if (path) {
      const children: any = editor.children;
      const child = children[path[0]]?.children[path[1]];
    }

    // if (child.type === "grid-layout-child" && path.length > 3) {
    //   console.log("maximum");

    //   Transforms.unwrapNodes(editor);
    //   const block = { type: "grid-layout-child", children: [] };

    //   Transforms.wrapNodes(editor, block);
    // }

    return (
      <div
        className="gridLayout__children"
        {...props.attributes}
        style={{
          width: props.element.width + "%",
          border: readonly ? "none" : "1px solid black",
        }}
      >
        {props.children}
      </div>
    );
  },

  ParaGraph(props: any) {
    return (
      <p {...props.attributes} className="my-2">
        {props.children}
      </p>
    );
  },

  Default(props: any) {
    return <span {...props.attributes}>{props.children}</span>;
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

  if (props.leaf.placeholder) {
    return (
      <>
        <DefaultLeaf {...props} />
        <span
          style={{ opacity: 0.8, position: "absolute", top: 0, color: "black" }}
          contentEditable={false}
        >
          Type / to open menu
        </span>
      </>
    );
  }

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
