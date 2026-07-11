import { formatMixedText } from "../utils/helpers";

export default function MixedText({
  as: Tag = "span",
  className = "",
  children = "",
}) {
  return (
    <Tag dir="auto" className={`mixed-text ${className}`}>
      {formatMixedText(children)}
    </Tag>
  );
}
