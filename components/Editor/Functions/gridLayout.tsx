import { Editor, Transforms, Path } from "slate";
import { ReactEditor } from "slate-react";
import { EditorType } from "types";
import { v4 as uuidv4 } from "uuid";

const gridLayout = (editor: EditorType, num: number, path: Path) => {
  numGgridLayout(editor, num, path);
};

export default gridLayout;

function numGgridLayout(editor: EditorType, num: number, path: Path) {
  // const newEditor = JSON.parse(JSON.stringify(editor));
  // const removeNode = newEditor.children[path[0]];
  // const dropNode = newEditor.children[num[0]];
  // if (newEditor.children[num[0]].type === "grid-layout") {
  //   const totalLength = newEditor.children[num[0]].children.length + 1;
  //   const parentKey = uuidv4();
  //   for (let data of newEditor.children[num[0]].children) {
  //     data.width = 100 / totalLength;
  //     data.line = true;
  //     data.parentKey = parentKey;
  //   }
  // const block = {
  //   type: "grid-layout",
  //   key: parentKey,
  //   children: [
  //     ...newEditor.children[num[0]].children,
  //     {
  //       children: [removeNode],
  //       type: "grid-layout-child",
  //       width: 100 / totalLength,
  //       line: true,
  //       key: uuidv4(),
  //       parentKey: parentKey,
  //     },
  //   ],
  // };
  // console.log(block);
  //   Transforms.removeNodes(editor, { at: path });
  //   block.children[block.children.length - 1].line = false;
  //   Transforms.removeNodes(editor, {
  //     match: (n: any) => n.type === "grid-layout",
  //     at: num,
  //   });
  //   Transforms.insertNodes(editor, block, { at: num });
  //   return;
  // }

  const parentKey = uuidv4();

  const blockChildren = [];

  for (let i = 0; i < num; i++) {
    blockChildren.push({
      children: [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
      width: 50,
      type: "grid-layout-child",
      line: i !== num - 1 ? true : false,
      key: uuidv4(),
      parentKey: parentKey,
    });
  }

  const block = {
    type: "grid-layout",
    key: parentKey,
    children: blockChildren,
  };

  Transforms.insertNodes(editor, block, { at: path });
}

function dropGridLayout() {
  // const newEditor = JSON.parse(JSON.stringify(editor));
  // const removeNode = newEditor.children[path[0]];
  // const dropNode = newEditor.children[num[0]];
  // if (newEditor.children[num[0]].type === "grid-layout") {
  //   const totalLength = newEditor.children[num[0]].children.length + 1;
  //   const parentKey = uuidv4();
  //   for (let data of newEditor.children[num[0]].children) {
  //     data.width = 100 / totalLength;
  //     data.line = true;
  //     data.parentKey = parentKey;
  //   }
  // const block = {
  //   type: "grid-layout",
  //   key: parentKey,
  //   children: [
  //     ...newEditor.children[num[0]].children,
  //     {
  //       children: [removeNode],
  //       type: "grid-layout-child",
  //       width: 100 / totalLength,
  //       line: true,
  //       key: uuidv4(),
  //       parentKey: parentKey,
  //     },
  //   ],
  // };
  // console.log(block);
  //   Transforms.removeNodes(editor, { at: path });
  //   block.children[block.children.length - 1].line = false;
  //   Transforms.removeNodes(editor, {
  //     match: (n: any) => n.type === "grid-layout",
  //     at: num,
  //   });
  //   Transforms.insertNodes(editor, block, { at: num });
  //   return;
  // }
  // const position = ReactEditor.findPath(editor, editor.children[num[0]]);
  // const parentKey = uuidv4();
  // const block = {
  //   type: "grid-layout",
  //   key: parentKey,
  //   children: [
  //     {
  //       children: [dropNode],
  //       width: 50,
  //       type: "grid-layout-child",
  //       line: true,
  //       key: uuidv4(),
  //       parentKey: parentKey,
  //     },
  //     {
  //       children: [removeNode],
  //       width: 50,
  //       type: "grid-layout-child",
  //       line: false,
  //       key: uuidv4(),
  //       parentKey: parentKey,
  //     },
  //   ],
  // };
  // Transforms.removeNodes(editor, { at: path });
  // Transforms.removeNodes(editor, { at: num });
  // Transforms.insertNodes(editor, block, { at: position });
}
