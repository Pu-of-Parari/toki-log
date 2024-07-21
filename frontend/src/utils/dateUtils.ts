// 日付をフォーマットするヘルパー関数
function formatDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp); // Unixタイムスタンプはミリ秒単位でなく秒単位なので、1000を掛ける
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo", // 日本時間
  };
  return new Intl.DateTimeFormat("ja-JP", options).format(date);
}

export { formatDate };
