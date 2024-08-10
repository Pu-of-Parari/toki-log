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

function parseDate(dateString: string): number {
  const date = new Date(dateString);
  return date.getTime();
}

function formatSecondsToTime(seconds: number): string {
  // 整数の部分を取得
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  // 数値を2桁にフォーマット
  const formattedHrs = String(hrs).padStart(2, '0');
  const formattedMins = String(mins).padStart(2, '0');
  const formattedSecs = String(secs).padStart(2, '0');

  // フォーマットして返す
  return `${formattedHrs}:${formattedMins}:${formattedSecs}`;
}

export { formatDate, parseDate, formatSecondsToTime };
