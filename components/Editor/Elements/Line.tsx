function Line(props: any) {
  return (
    <>
      <div
        {...props.attributes}
        style={{ display: "flow-root" }}
        contentEditable={false}
        className=" hr--line"
      >
        <hr
          style={{
            display: "flow-root",
            height: "3px",
            backgroundColor: "#E6E9EF",
            margin: "1rem 0",
            border: "0px",
            borderRadius: "3px",
          }}
        />

        <span style={{ display: "none" }}>{props.children}</span>
      </div>
    </>
  );
}

export default Line;
