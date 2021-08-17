const Leaf = function (props: any) {
  let el = <>{props.children}</>;

  if (props.leaf.leafCode) {
    el = <code>{el}</code>;
  }

  const DefaultLeaf = (props: any) => (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration:
          props.leaf.underline && props.leaf.strikeThrough
            ? "underline line-through"
            : props.leaf.strikeThrough
            ? "line-through"
            : props.leaf.underline && "underline",
        verticalAlign: props.leaf.super ? "super " : props.leaf.sub && "sub",
      }}
    >
      {el}
    </span>
  );

  if (props.leaf.placeholder) {
    switch (props.children.props?.parent.type) {
      case "heading-1":
        return getPlaceholder("Heading 1");
      case "heading-2":
        return getPlaceholder("Heading 2");
      case "heading-3":
        return getPlaceholder("Heading 3");
      case "paragraph":
        return getPlaceholder("Type a paragaph");
      case "list-item":
        return getPlaceholder("List");

      default:
        return <DefaultLeaf {...props} />;
    }
  }

  function getPlaceholder(placeholder: string) {
    return (
      <>
        <DefaultLeaf {...props} />
        <span
          style={{
            opacity: 0.3,
            position: "absolute",
            top: 10,
            fontWeight: "500" as any,
          }}
          contentEditable={false}
        >
          {placeholder}
        </span>
      </>
    );
  }

  return <DefaultLeaf {...props} />;

  // if (props.leaf.bold) {
  //   el = <strong>{el}</strong>;
  // }

  // if (props.leaf.code) {
  //   el = <code>{el}</code>;
  // }

  // if (props.leaf.italic) {
  //   el = <em>{el}</em>;
  // }

  // if (props.leaf.underline) {
  //   el = <u>{el}</u>;
  // }

  // if (props.leaf.strikeThrough) {
  //   el = <del>{el}</del>;
  // }

  // if (props.leaf.super) {
  //   el = <sup>{el}</sup>;
  // }

  // if (props.leaf.sub) {
  //   el = <sub>{el}</sub>;
  // }
};

export default Leaf;
