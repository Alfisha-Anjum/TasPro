"use client";

type SafeImageProps = {
  src?: string | null;
  alt?: string | null;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  style,
}: SafeImageProps) {
  const safeSrc =
    typeof src === "string" && src.trim() !== "" ? src : "/10.svg";

  if (fill) {
    return (
      <img
        src={safeSrc}
        alt={alt || "Image"}
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          ...style,
        }}
      />
    );
  }

  return (
    <img
      src={safeSrc}
      alt={alt || "Image"}
      width={width || 80}
      height={height || 80}
      className={className}
      style={style}
    />
  );
}
