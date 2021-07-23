import React from "react";
import dynamic from "next/dynamic";
const Create = dynamic(import("components/Editor/Create"), { ssr: false });
// import Create from "components/Task/Create";

function createPage() {
  return (
    <div>
      <Create />
    </div>
  );
}

export default createPage;
