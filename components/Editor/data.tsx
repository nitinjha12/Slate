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
import { Table } from "@styled-icons/bootstrap/Table";
import CustomEditor from "./Editor";
import { EditorType, ToolbarButtonDataInterface } from "types";

export const customEditorData = {
  // choose: {
  //   editorData: { type: undefined, value: "" },
  //   markBlock: false,
  //   children: "Choose Heading",
  //   style: {},
  // },
  p: {
    editorData: { type: undefined, value: "paragraph" },
    markBlock: false,
    children: "Paragraph",
    style: {},
    title: "heading",
  },

  h1: {
    editorData: { type: undefined, value: "heading-1" },
    markBlock: false,
    children: "Heading 1",
    style: {},
    title: "heading",
  },
  h2: {
    editorData: { type: undefined, value: "heading-2" },
    markBlock: false,
    children: "Heading 2",
    style: {},
    title: "heading",
  },
  h3: {
    editorData: { type: undefined, value: "heading-3" },
    markBlock: false,
    children: "Heading 3",
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
    children: <CodeAlt />,
    style: {},
    title: "Code Block",
  },

  ulList: {
    editorData: { value: "bulleted-list", type: undefined },
    markBlock: false,
    children: <ListUl size="24" />,
    style: {},
    title: "unordered-list",
  },
  olList: {
    editorData: { value: "ordered-list", type: undefined },
    markBlock: false,
    children: <ListOrdered size="20" />,
    style: {},
    title: "ordered-list",
  },
  horizontalLine: {
    editorData: { value: "line", type: undefined },
    markBlock: false,
    children: <LineHorizontal1 size="20" />,
    style: {},
    title: "Code Block",
  },
  leftAlign: {
    editorData: { value: "left-align", type: undefined },
    markBlock: false,
    children: <AlignLeft size="20" />,
    style: {},
    title: "Left-Align",
  },
  centerAlign: {
    editorData: { value: "center-align", type: undefined },
    markBlock: false,
    children: <AlignMiddle size="20" />,
    style: {},
    title: "Center-Align",
  },
  rightAlign: {
    editorData: { value: "right-align", type: undefined },
    markBlock: false,
    children: <AlignRight size="20" />,
    style: {},
    title: "Right-Align",
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
    children: <Image size="20" />,
    style: {},
    title: "Image",
  },
  video: {
    editorData: { value: "video", type: undefined },
    markBlock: false,
    children: <Video size="20" />,
    style: {},
    title: "Video",
  },
  table: {
    editorData: { value: "table", type: undefined },
    markBlock: false,
    children: <Table size="18" />,
    style: {},
    title: "Table",
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
      onMouseDown(e: React.MouseEvent, editor: EditorType) {
        e.preventDefault();

        if (
          data.editorData.value === "image" ||
          data.editorData.value === "video" ||
          data.editorData.value === "table"
        ) {
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
