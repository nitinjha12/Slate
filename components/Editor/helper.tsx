import Element, { Leaf } from "./Element";
import { DefaultElement } from "slate-react";
import { Editor, Path, Point, Range } from "slate";
import { EditorType, EditorInterface } from "types";

export const useEditorConfig = () => {
  return { renderElement, renderLeaf };
};

export function isLinkNodeAtSelection(
  editor: EditorType,
  selection: Range | Path | Point | undefined
) {
  if (!selection) {
    return false;
  }

  return !!Editor.above(editor, {
    at: selection,
    match: (n: any) => n.type === "link",
  });
}

const renderLeaf = (props: any) => <Leaf {...props} />;

const renderElement = (props: any) => {
  switch (props.element.type) {
    case "link":
      return <Element.Anchor {...props} />;
    case "heading-1":
      return <Element.Heading1 {...props} />;
    case "heading-2":
      return <Element.Heading2 {...props} />;
    case "heading-3":
      return <Element.Heading3 {...props} />;

    case "code":
      return <Element.Code {...props} />;
    case "table":
      return <Element.Table {...props} />;
    case "table-head":
      return <Element.TableHead {...props} />;
    case "table-body":
      return <Element.TableBody {...props} />;
    case "table-row":
      return <Element.TableRow {...props} />;
    case "table-cell":
      return <Element.TableColumn {...props} />;
    case "bulleted-list":
      return <Element.BulletedList {...props} />;
    case "ordered-list":
      return <Element.OrderedList {...props} />;
    case "toggle-list":
      return <Element.ToggleList {...props} />;
    case "line":
      return <Element.Line {...props} />;
    case "list-item":
      return <Element.ListItem {...props} />;
    case "left-align":
      return <Element.LeftAlign {...props} />;
    case "center-align":
      return <Element.CenterAlign {...props} />;
    case "right-align":
      return <Element.RightAlign {...props} />;
    case "link":
      return <Element.Link {...props} />;
    case "image":
      return <Element.Image {...props} />;
    case "video":
      return <Element.Video {...props} />;
    case "grid-layout":
      return <Element.GridLayout {...props} />;
    case "grid-layout-child":
      return <Element.GridLayoutChildren {...props} />;
    case "paragraph":
      return <Element.ParaGraph {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

export const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "This example shows how you can make a hovering menu appear above your content, which you can use to make text ",
      },
      { text: "bold", bold: true },
      { text: ", " },
      { text: "italic", italic: true },
      { text: ", or anything else you might want to do!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "Try it out yourself! Just " },
      { text: "select any piece of text and the menu will appear", bold: true },
      { text: "." },
    ],
  },
  {
    type: "image",
    src: "/bigo.png",
    caption: "Big O",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ text: "" }] },

  {
    type: "video",
    src: "https://player.vimeo.com/video/336812686",
    url: "",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ text: "" }] },
];
