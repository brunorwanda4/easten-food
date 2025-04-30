import { useState } from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
  classname?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export const MyImage = ({
  src,
  alt = "Image",
  className,
  classname,
  width = "",
  height = "",
  style = {},
}: Props) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={className} style={{ position: "relative" }}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className={classname}
          loading="lazy"
          width={width}
          height={height}
          style={{
            width,
            height,
            objectFit: "cover",
            ...style,
          }}
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          style={{
            width,
            height,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee",
            color: "#888",
            fontSize: 14,
          }}
        >
          Image not available
        </div>
      )}
    </div>
  );
};
