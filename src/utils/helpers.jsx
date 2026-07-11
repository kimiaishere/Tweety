export function getRelativeTime(id) {
  const hours = (id * 3) % 48;
  if (hours < 1) return "همین الان";
  if (hours < 24) return `${hours} ساعت پیش`;
  const days = Math.floor(hours / 24);
  return `${days} روز پیش`;
}

export function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarColor(id = 1) {
  const colors = [
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
  ];
  return colors[(id - 1) % colors.length];
}

const LTR_RUN =
  /[A-Za-z@_$#][A-Za-z0-9_#@.\-/\\:]*|\d+(?:\.\d+)?(?:px|rem|em|vh|vw|ms|s|%)?/g;

export function formatMixedText(text = "") {
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
