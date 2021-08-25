import React from "react";

function Quote(props: any) {
  return (
    <div style={{ position: "relative" }}>
      <div className="ele__quoteVerticalLine"></div>
      <div style={{ position: "relative", left: "8px" }}>{props.children}</div>
    </div>
  );
}

export default Quote;
