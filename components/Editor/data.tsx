import { ListUl } from "@styled-icons/boxicons-regular/ListUl";
import { CodeAlt } from "@styled-icons/boxicons-regular/CodeAlt";
import { ListOrdered } from "@styled-icons/remix-editor/ListOrdered";
import { Strikethrough } from "@styled-icons/boxicons-regular/Strikethrough";
import { AlignLeft } from "@styled-icons/boxicons-regular/AlignLeft";
import { AlignMiddle } from "@styled-icons/boxicons-regular/AlignMiddle";
import { AlignRight } from "@styled-icons/boxicons-regular/AlignRight";
import { Subscript } from "@styled-icons/fa-solid/Subscript";
import { Superscript } from "@styled-icons/fa-solid/Superscript";
import { LinkAlt } from "@styled-icons/boxicons-regular/LinkAlt";
import { Image } from "@styled-icons/boxicons-regular/Image";
import { Video } from "@styled-icons/entypo/Video";
import { LineHorizontal1 } from "@styled-icons/fluentui-system-filled/LineHorizontal1";
import { PlaylistPlay } from "@styled-icons/material-outlined/PlaylistPlay";
import { Table } from "@styled-icons/bootstrap/Table";
import { Grid } from "@styled-icons/boxicons-regular/Grid";
import { ViewCarousel } from "@styled-icons/material-sharp/ViewCarousel";
import { Paragraph } from "@styled-icons/bootstrap/Paragraph";
import { Heading } from "@styled-icons/fa-solid/Heading";
import { Heading as Heading2 } from "@styled-icons/boxicons-regular/Heading";
import { Heading as Heading3 } from "@styled-icons/remix-editor/Heading";
import { Delete } from "@styled-icons/fluentui-system-regular/Delete";
import { Duplicate } from "@styled-icons/heroicons-outline/Duplicate";
import { Play } from "@styled-icons/boxicons-regular/Play";
import TurnInto from "components/icons/TurnInto";
import CustomEditor from "./Editor";
import { EditorType, ToolbarButtonDataInterface } from "types";
import { Path } from "slate";

export const dropEditorData = {
  delete: {
    children: { icons: <Delete size="20" />, name: "Delete" },
    shortcut: "Del",
  },
  duplicate: {
    children: { icons: <Duplicate size="20" />, name: "Duplicate" },
    shortcut: "Ctr+D",
  },
  turnInto: {
    children: { icons: <TurnInto />, name: "Turn Into" },
    shortcut: <Play size="20" />,
  },
};

const dropEditorDataArr = Object.values(dropEditorData);

export const dropToolbarDataArr: any = [];

for (let data of dropEditorDataArr) {
  dropToolbarDataArr.push({
    onMouseDown(editor: EditorType, path: Path) {
      CustomEditor.dropOperation(
        editor,
        data.children.name.toLowerCase(),
        path
      );
    },
    shortcut: data.shortcut,
    children: data.children,
  });
}

export const customEditorData = {
  p: {
    editorData: { type: undefined, value: "paragraph" },
    markBlock: false,
    children: { icon: "toolbar/text.png", name: "Paragraph" },
    style: {},
    title: "heading",
    desc: "Just start writing with plain text.",
  },

  h1: {
    editorData: { type: undefined, value: "heading-1" },
    markBlock: false,
    children: { icon: "toolbar/header.png", name: "Heading 1" },
    style: {},
    title: "heading",
    desc: "Big section heading.",
  },
  h2: {
    editorData: { type: undefined, value: "heading-2" },
    markBlock: false,
    children: { icon: "toolbar/subheader.png", name: "Heading 2" },
    style: {},
    title: "heading",
    desc: "Medium section heading.",
  },
  h3: {
    editorData: { type: undefined, value: "heading-3" },
    markBlock: false,
    children: { icon: "toolbar/subsubheader.png", name: "Heading 3" },
    style: {},
    title: "heading",
    desc: "Small section heading.",
  },
  bold: {
    editorData: { type: "bold", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>B</span>,
    style: { fontWeight: "bold" },
    title: "bold(Ctr+B)",
    desc: "",
  },
  italic: {
    editorData: { type: "italic", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>I</span>,
    style: { fontStyle: "italic" },
    title: "italic(Ctr+I)",
    desc: "",
  },
  underline: {
    editorData: { type: "underline", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>U</span>,
    style: { textDecoration: "underline" },
    title: "underline",
    desc: "",
  },
  strike: {
    editorData: { type: "strikeThrough", value: undefined },
    markBlock: true,
    children: <Strikethrough size="24" />,
    style: {},
    title: "StrikeThrough",
    desc: "",
  },
  leafCode: {
    editorData: { type: "leafCode", value: undefined },
    markBlock: true,
    children: <CodeAlt />,
    style: {},
    title: "Code",
    desc: "",
  },
  superScript: {
    editorData: { type: "super", value: undefined },
    markBlock: true,
    children: <Superscript size="18" />,
    style: {},
    title: "Sup",
    desc: "",
  },
  subScript: {
    editorData: { type: "sub", value: undefined },
    markBlock: true,
    children: <Subscript size="18" />,
    style: {},
    title: "Sub",
    desc: "",
  },
  code: {
    editorData: { value: "code", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/code.png", name: "Code Block" },
    style: {},
    title: "Code Block",
    desc: "Capture a code snippet.",
  },

  ulList: {
    editorData: { value: "bulleted-list", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/bulleted-list.png", name: "Bullet List" },
    style: {},
    title: "unordered-list",
    desc: "Create a simple bulleted list.",
  },
  olList: {
    editorData: { value: "ordered-list", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/numbered-list.png", name: "Number List" },
    style: {},
    title: "ordered-list",
    desc: "Create a list with numbering.",
  },
  divider: {
    editorData: { value: "line", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/divider.png", name: "Divider" },
    style: {},
    title: "Divider",
    desc: "Visually divide blocks.",
  },
  toggleList: {
    editorData: { value: "toggle-list", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/toggle.png", name: "ToggleList" },
    style: {},
    title: "Toggle List",
    desc: "Toggles can hide and show content inside.",
  },
  quote: {
    editorData: { value: "quote", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/quote.png", name: "Quote" },
    style: {},
    title: "Quote",
    desc: "Capture a quote.",
  },
  leftAlign: {
    editorData: { value: "left-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignLeft size="20" />, name: "Text Align Left" },
    style: {},
    title: "Left-Align",
    desc: "Align text left",
  },
  centerAlign: {
    editorData: { value: "center-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignMiddle size="20" />, name: "Text Align Center" },
    style: {},
    title: "Center-Align",
    desc: "Align text center",
  },
  rightAlign: {
    editorData: { value: "right-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignRight size="20" />, name: "Text Align Right" },
    style: {},
    title: "Right-Align",
    desc: "Align text right",
  },
  table: {
    editorData: { value: "table", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/table.png", name: "Table" },
    style: {},
    title: "Table",
    desc: "Create a table.",
  },
  link: {
    editorData: { value: "link", type: undefined },
    markBlock: false,
    children: <LinkAlt size="20" />,
    style: {},
    title: "Link",
    desc: "",
  },
  image: {
    editorData: { value: "image", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/image.png", name: "Image" },
    style: {},
    title: "Image",
    desc: "Upload or embed with a link.",
  },
  video: {
    editorData: { value: "video", type: undefined },
    markBlock: false,
    children: { icon: "toolbar/video.png", name: "Video" },
    style: {},
    title: "Video",
    desc: "Embed from YouTube, Vimeo.",
  },

  // carousel: {
  //   editorData: { value: "carousel", type: undefined },
  //   markBlock: false,
  //   children: { icon: <ViewCarousel size="18" />, name: "Carousel" },
  //   style: {},
  //   title: "Carousel",
  // },

  gridLayout2: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 2 Column", number: 2 },
    style: {},
    title: "Grid Layout",
    desc: "Create 2 column layout",
  },
  gridLayout3: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 3 Column", number: 3 },
    style: {},
    title: "Grid Layout",
    desc: "Create 3 column layout",
  },
  gridLayout4: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 4 Column", number: 4 },
    style: {},
    title: "Grid Layout",
    desc: "Create 4 column layout",
  },
};

const imageEditorData = {
  original: {
    editorData: { value: "100%" },
    children: "Original",
    style: { width: "100%" },
  },
  25: {
    editorData: { value: "25%" },
    children: "25%",
    style: { width: "25%" },
  },
  50: {
    editorData: { value: "50%" },
    children: "50%",
    style: { width: "50%" },
  },
  75: {
    editorData: { value: "75%" },
    children: "75%",
    style: { width: "75%" },
  },

  flexStart: {
    editorData: { value: "flex-start" },
    children: <AlignLeft size="20" />,
    style: { justifyContent: "flex-start" },
  },
  flexCenter: {
    editorData: { value: "center" },
    children: <AlignMiddle size="20" />,
    style: { justifyContent: "center" },
  },
  flexEnd: {
    editorData: { value: "flex-end" },
    children: <AlignRight size="20" />,
    style: { justifyContent: "flex-end" },
  },
  link: {
    editorData: { value: "link" },
    children: <LinkAlt size="20" />,
    style: {},
  },
};

const customEditorDataArr = Object.values(customEditorData);
const imageEditorDataArr = Object.values(imageEditorData);

export const toolbarButtonData: Array<ToolbarButtonDataInterface> = [];

for (let data of customEditorDataArr) {
  if (!data.markBlock && data.editorData.value !== "link") {
    toolbarButtonData.push({
      onMouseDown(e, editor, path) {
        e.preventDefault();

        if (
          data.editorData.value === "image" ||
          data.editorData.value === "video" ||
          data.editorData.value === "table" ||
          data.editorData.value === "carousel"
        ) {
          return;
        }

        CustomEditor.toggleBlock(
          {
            editor,
            type: data.editorData.type,
            value: data.editorData.value,
          },
          data.markBlock,
          path
        );
      },
      children: data.children,
      style: data.style,
      name: data.editorData.value,
      desc: data.desc,
      title: data.title,
      isActive(editor: EditorType) {
        return CustomEditor.isBlockActive({
          editor,
          type: data.editorData.type,
          value: data.editorData.value,
        });
      },
    });
  }
}

export const hoveringToolbarData: any = [];

for (let data of customEditorDataArr) {
  if (data.markBlock || data.editorData.value === "link") {
    hoveringToolbarData.push({
      onMouseDown(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        editor: EditorType
      ) {
        e.preventDefault();

        if (data.editorData.value === "link") {
          CustomEditor.toggleLinkAtSelection(editor);
          return;
        }

        CustomEditor.toggleBlock(
          {
            editor,
            type: data.editorData.type,
            value: data.editorData.value,
          },
          data.markBlock
        );
      },
      children: data.children,
      style: data.style,
      isActive(editor: EditorType) {
        if (data.markBlock && data.editorData.type) {
          return CustomEditor.isMarkActive(editor, data.editorData.type);
        }

        return CustomEditor.isBlockActive({
          editor,
          type: data.editorData.type,
          value: data.editorData.value,
        });
      },
    });
  }
}

export const imageToolbarData: any = [];

for (let data of imageEditorDataArr) {
  imageToolbarData.push({
    onMouseDown(e: React.MouseEvent, editor: EditorType) {
      e.preventDefault();

      if (data.editorData.value === "link") {
        CustomEditor.toggleLinkAtSelection(editor);
        return;
      }
      CustomEditor.imageStyle(editor, data.style);
    },
    children: data.children,
    name: data.editorData.value,
    isActive(editor: EditorType) {
      if (data.editorData.value === "link") {
        return CustomEditor.isBlockActive({
          editor,
          value: data.editorData.value,
        });
      }
      return CustomEditor.isImageStyle(
        editor,
        Object.keys(data.style)[0],
        data.editorData.value
      );
    },
  });
}
