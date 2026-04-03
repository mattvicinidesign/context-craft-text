const buildTimestamp = (() => {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `v${now.getFullYear()}.${pad(now.getMonth() + 1)}.${pad(now.getDate())}.${pad(now.getHours())}${pad(now.getMinutes())}`;
})();

export const APP_VERSION: string =
  (import.meta.env.VITE_APP_VERSION as string) || buildTimestamp;
