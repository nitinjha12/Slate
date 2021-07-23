import React, { useState } from "react";
import Image from "next/image";
import { ImageLoader } from "types/common";

function ImageWithLoader({
  src,
  alt,
  height,
  width,
  layout = "intrinsic",
  priority = false,
  quality = "75",
  className,
  parentClassName,
  objectFit = "fill",
  onClick,
}: ImageLoader) {
  const [loader, setLoader] = useState(true);

  const styleLoader = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <main
      className={`${parentClassName} customParentLoader`}
      style={loader ? styleLoader : { display: "block" }}
    >
      {loader && <mark className="customLoader"></mark>}
      <Image
        onLoad={(e: any) => {
          if (e.target.complete && e.target.isConnected) {
            setLoader(false);
          }
        }}
        onClick={onClick}
        className={className}
        src={src}
        alt={alt}
        width={width!}
        height={height!}
        priority={priority}
        quality={quality}
        layout={layout}
        objectFit={objectFit}
      />
    </main>
  );
}

export default ImageWithLoader;
