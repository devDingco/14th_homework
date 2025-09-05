export function formatDate(input?: string | Date | null): string {
  if (!input) return "";

  const dateString = typeof input === "string" ? input : input.toISOString();

  // Extract YYYY, MM, DD using only digits (supports ISO and various separators)
  const digitsOnly = dateString.replace(/[^\d]/g, "");
  if (digitsOnly.length >= 8) {
    const year = digitsOnly.slice(0, 4);
    const month = digitsOnly.slice(4, 6);
    const day = digitsOnly.slice(6, 8);
    return `${year}.${month}.${day}`;
  }

  // Fallback: try native Date parsing
  const d = new Date(dateString);
  if (!Number.isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  }

  return "";
}


