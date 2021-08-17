import { Transforms, Editor, Element, Range, Node } from "slate";
import { EditorType } from "types";
import { v4 as uuidv4 } from "uuid";

const withKey = (editor: EditorType) => {
  const { normalizeNode, insertBreak, insertText, apply } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path]: any = entry;

    // if (!Node.leaf(node, path)) return;

    if (!node.text) return;

    if (!node.key) {
      Transforms.setNodes(editor, { key: uuidv4() } as any, { at: path });
    }

    return normalizeNode(entry);
  };

  editor.apply = (op) => {
    switch (op.type) {
      case "split_node":
        (op.properties as any).key = uuidv4();
        break;
      case "remove_node":
        // console.log(op);
        break;
      case "set_selection":
        break;
      case "insert_node":
      // console.log(op);
    }

    apply(op);
  };

  return editor;
};

export default withKey;
