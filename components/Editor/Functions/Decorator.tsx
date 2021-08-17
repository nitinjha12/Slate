import { Editor, Range, Path } from "slate";
import { EditorType } from "types";

const decoratorFunction = ([node, path]: [any, Path], editor: EditorType) => {
  if (editor.selection != null) {
    // console.log(leafNodeTraversal(node, path[0]));
    if (
      !Editor.isEditor(node) &&
      Editor.string(editor, [path[0]]) === "" &&
      Range.includes(editor.selection, path) &&
      Range.isCollapsed(editor.selection)
    ) {
      return [
        {
          ...editor.selection,
          placeholder: true,
        },
      ];
    }
  }
  return [];
};

export default decoratorFunction;

function leafNodeTraversal(node: any, path: number): boolean {
  console.log(node);
  if (node && node.length && node[0].text) {
    if (node[0].text === "") return true;
    else return false;
  }

  if (node && node.length && node[path]) {
    return leafNodeTraversal(node[path], path);
  }

  if (node) return leafNodeTraversal(node.children, path);

  return false;
}
