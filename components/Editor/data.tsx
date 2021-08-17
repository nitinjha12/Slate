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
    children: { icon: <Paragraph size="20" />, name: "Paragraph" },
    style: {},
    title: "heading",
  },

  h1: {
    editorData: { type: undefined, value: "heading-1" },
    markBlock: false,
    children: { icon: <Heading size="20" />, name: "Heading 1" },
    style: {},
    title: "heading",
  },
  h2: {
    editorData: { type: undefined, value: "heading-2" },
    markBlock: false,
    children: { icon: <Heading2 size="20" />, name: "Heading 2" },
    style: {},
    title: "heading",
  },
  h3: {
    editorData: { type: undefined, value: "heading-3" },
    markBlock: false,
    children: { icon: <Heading3 size="20" />, name: "Heading 3" },
    style: {},
    title: "heading",
  },
  bold: {
    editorData: { type: "bold", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>B</span>,
    style: { fontWeight: "bold" },
    title: "bold(Ctr+B)",
  },
  italic: {
    editorData: { type: "italic", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>I</span>,
    style: { fontStyle: "italic" },
    title: "italic(Ctr+I)",
  },
  underline: {
    editorData: { type: "underline", value: undefined },
    markBlock: true,
    children: <span style={{ fontSize: "18px" }}>U</span>,
    style: { textDecoration: "underline" },
    title: "underline",
  },
  strike: {
    editorData: { type: "strikeThrough", value: undefined },
    markBlock: true,
    children: <Strikethrough size="24" />,
    style: {},
    title: "StrikeThrough",
  },
  leafCode: {
    editorData: { type: "leafCode", value: undefined },
    markBlock: true,
    children: <CodeAlt />,
    style: {},
    title: "Code",
  },
  superScript: {
    editorData: { type: "super", value: undefined },
    markBlock: true,
    children: <Superscript size="18" />,
    style: {},
    title: "Sup",
  },
  subScript: {
    editorData: { type: "sub", value: undefined },
    markBlock: true,
    children: <Subscript size="18" />,
    style: {},
    title: "Sub",
  },
  code: {
    editorData: { value: "code", type: undefined },
    markBlock: false,
    children: { icon: <CodeAlt size="20" />, name: "Code Block" },
    style: {},
    title: "Code Block",
  },

  ulList: {
    editorData: { value: "bulleted-list", type: undefined },
    markBlock: false,
    children: { icon: <ListUl size="24" />, name: "Bullet List" },
    style: {},
    title: "unordered-list",
  },
  olList: {
    editorData: { value: "ordered-list", type: undefined },
    markBlock: false,
    children: { icon: <ListOrdered size="20" />, name: "Number List" },
    style: {},
    title: "ordered-list",
  },
  horizontalLine: {
    editorData: { value: "line", type: undefined },
    markBlock: false,
    children: { icon: <LineHorizontal1 size="20" />, name: "Divider" },
    style: {},
    title: "Code Block",
  },
  toggleList: {
    editorData: { value: "toggle-list", type: undefined },
    markBlock: false,
    children: { icon: <PlaylistPlay size="18" />, name: "ToggleList" },
    style: {},
    title: "Toggle List",
  },
  leftAlign: {
    editorData: { value: "left-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignLeft size="20" />, name: "Text Align Left" },
    style: {},
    title: "Left-Align",
  },
  centerAlign: {
    editorData: { value: "center-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignMiddle size="20" />, name: "Text Align Center" },
    style: {},
    title: "Center-Align",
  },
  rightAlign: {
    editorData: { value: "right-align", type: undefined },
    markBlock: false,
    children: { icon: <AlignRight size="20" />, name: "Text Align Right" },
    style: {},
    title: "Right-Align",
  },
  table: {
    editorData: { value: "table", type: undefined },
    markBlock: false,
    children: { icon: <Table size="18" />, name: "Table" },
    style: {},
    title: "Table",
  },
  link: {
    editorData: { value: "link", type: undefined },
    markBlock: false,
    children: <LinkAlt size="20" />,
    style: {},
    title: "Link",
  },
  image: {
    editorData: { value: "image", type: undefined },
    markBlock: false,
    children: { icon: <Image size="20" />, name: "Image" },
    style: {},
    title: "Image",
  },
  video: {
    editorData: { value: "video", type: undefined },
    markBlock: false,
    children: { icon: <Video size="20" />, name: "Video" },
    style: {},
    title: "Video",
  },

  carousel: {
    editorData: { value: "carousel", type: undefined },
    markBlock: false,
    children: { icon: <ViewCarousel size="18" />, name: "Carousel" },
    style: {},
    title: "Carousel",
  },

  gridLayout2: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 2 Column", number: 2 },
    style: {},
    title: "Grid Layout",
  },
  gridLayout3: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 3 Column", number: 3 },
    style: {},
    title: "Grid Layout",
  },
  gridLayout4: {
    editorData: { value: "grid-layout", type: undefined },
    markBlock: false,
    children: { icon: <Grid size="18" />, name: "Add 4 Column", number: 4 },
    style: {},
    title: "Grid Layout",
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
