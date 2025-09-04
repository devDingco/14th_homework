export function toYouTubeEmbedUrl(input?: string | null): string {
  if (!input) return "";

  try {
    const url = new URL(input);

    // youtu.be/<id>
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    // www.youtube.com or m.youtube.com
    const isYouTube = /(^|\.)youtube\.com$/.test(url.hostname);
    if (!isYouTube) return "";

    // shorts
    if (url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.split("/")[2] || "";
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    // watch?v=
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v") || "";
      const start = url.searchParams.get("t") || url.searchParams.get("start") || "";
      const params = new URLSearchParams();
      if (start) params.set("start", start.replace(/s$/, ""));
      const tail = params.toString();
      return id ? `https://www.youtube.com/embed/${id}${tail ? `?${tail}` : ""}` : "";
    }

    // playlist embed (list only) → skip, we only support single video
    // fallback: try to extract 11-char id
    const match = input.match(/[\/?=]([a-zA-Z0-9_-]{11})(?:[&#?/]|$)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  } catch {
    // ignore
  }

  return "";
}


