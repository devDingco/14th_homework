// 영상 ID 추출
export const getYoutubeVideoId = (url?: string) => {
  if (!url) return null;
  try {
    if (url.includes("watch?v=")) {
      return new URL(url).searchParams.get("v");
    }
    if (url.includes("youtu.be")) {
      const idWithParams = url.split("youtu.be/")[1];
      return idWithParams.split("?")[0]; // ? 앞부분만 반환 
    }
    return null;
  } catch {
    return null;
  }
};

// 임베드 URL 반환
export const getEmbedUrl = (url?: string) => {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

//썸네일 URL 반환
export const getYoutubeThumbnail = (url?: string) => {
  const videoId = getYoutubeVideoId(url);
  console.log(videoId)
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://your-default-image.com/default.jpg";
};
