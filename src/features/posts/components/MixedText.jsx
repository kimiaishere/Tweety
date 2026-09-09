const LTR_RUN =
  /[A-Za-z@_$#][A-Za-z0-9_#@.\-/\\:]*|\d+(?:\.\d+)?(?:px|rem|em|vh|vw|ms|s|%)?/g;

function formatMixedText(text = "") {
  if (!text) return null;

  const segments = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LTR_RUN)) {
    if (match.index > lastIndex) {
      segments.push(text.slice(lastIndex, match.index));
    }
    segments.push({ ltr: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push(text.slice(lastIndex));
  }

  if (segments.length === 0) return text;

  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      seg
    ) : (
      <span key={i} dir="ltr" className="bidi-ltr">
        {seg.ltr}
      </span>
    )
  );
}

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