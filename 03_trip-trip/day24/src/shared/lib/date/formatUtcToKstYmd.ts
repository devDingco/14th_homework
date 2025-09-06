export const formatUtcToKstYmd = (utcDateString: string): string =>{
  const date = new Date(utcDateString)
  
  return date.toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/-/g, ".")
}