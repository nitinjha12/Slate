import { useState, useContext } from "react";
import { useSelected, useFocused, useSlate } from "slate-react";
import TableToolbar from "../TableToolbar";
import Context from "context/context";

function Table(props: any) {
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlate();
  const [dropDown, setDropdown] = useState(true);
  const lightCtx = useContext(Context);

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
        className={`render__table ${lightCtx.isLight ? "light" : "dark"}`}
        {...props.attributes}
        onPointerDown={() => setDropdown(false)}
      >
        {props.children}
      </table>
    </section>
  );
}

export default Table;
