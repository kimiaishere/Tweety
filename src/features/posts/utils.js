export function getRelativeTime(id) {
  const hours = (id * 3) % 48;
  if (hours < 1) return "همین الان";
  if (hours < 24) return `${hours} ساعت پیش`;
  const days = Math.floor(hours / 24);
  return `${days} روز پیش`;
}