import { Path, Operation } from "slate";

const shouldMerge = (op: Operation, prev: Operation | undefined): boolean => {
  if (op.type === "set_selection") {
    return true;
  }
  if (
    prev &&
    op.type === "insert_text" &&
    prev.type === "insert_text" &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }
  if (
    prev &&
    op.type === "remove_text" &&
    prev.type === "remove_text" &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }
  return false;
};

export default shouldMerge;
