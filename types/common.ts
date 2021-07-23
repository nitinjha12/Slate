export interface ImageLoader {
  src: string;
  alt: string;
  height?: string | number;
  width?: string | number;
  className?: string;
  parentClassName?: string;
  layout?: "intrinsic" | "fixed" | "responsive" | undefined;
  priority?: boolean;
  quality?: string;
  objectFit?: "contain" | "cover" | "none" | "fill";
  onClick?(e: React.MouseEvent): void;
}

export interface ModelProps {
  imageClickHandler(e: React.MouseEvent, value: string): void;
}
