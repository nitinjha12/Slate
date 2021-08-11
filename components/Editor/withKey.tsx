import { Transforms, Editor, Element } from "slate";
import { EditorType } from "types";
import { v4 as uuidv4 } from "uuid";

const withKey = (editor: EditorType) => {
  const { normalizeNode, insertBreak, insertText, apply } = editor;

  editor.normalizeNode = (entry) => {
    const [node, path]: any = entry;

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
    }

    apply(op);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [para]: any = Editor.nodes(editor, {
        match: (n: any) => {
          Transforms.setNodes(editor, { key: uuidv4() } as any);

          return !Editor.isEditor(n) && (Element.isElement(n) as any) && n.text;
        },
      });
    }

    insertBreak();
  };

  return editor;
};

export default withKey;
