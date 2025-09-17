import { getEmbedUrl, getYoutubeThumbnail, } from "@/components/utils/getEmbedUrl";
import styles from "./YoutubePreview.module.css";
import { useState } from "react";

import Image from "next/image";
import playIcon from "@assets/play_icon.png"

const IMAGE_SRC = {
  playIcon: { src: playIcon, alt: "재생버튼"},
};

interface Props {
  url?: string;
}

export default function YoutubePreview({ url }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = getEmbedUrl(url);

  if (!url) return null;

   // autoplay 붙은 URL
   const playUrl =embedUrl.replace("watch?v=", "embed/") + (isPlaying ? "?autoplay=1" : "");


  const thumbnailUrl = getYoutubeThumbnail(url);


  return (
    // 유튜브 기본 재생버튼
    // <div className={styles.youtubecontainer}>
    //   <div className={styles.wrapper}>
    //     <iframe
    //       src={embedUrl}
    //       title="YouTube video player"
    //       frameBorder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //       allowFullScreen
    //     />
    //   </div>
    // </div>

    <div className={styles.youtubecontainer}>
    <div className={styles.wrapper} onClick={() => setIsPlaying(true)} style={{ position: "relative" }}>
      {isPlaying ? (
        <iframe
          src={playUrl} // 클릭하면 자동 재생
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
          //  <div className={styles.overlay} onClick={() => setIsPlaying(true)}>
          //   <Image
          //     src={IMAGE_SRC.playIcon.src}
          //     alt={IMAGE_SRC.playIcon.alt}
          //     className={styles.playButton}
          //   />
          // </div>

        <div className={styles.thumbnailWrapper}>
          <img src={thumbnailUrl} className={styles.thumbnail} />
          <Image 
            src={IMAGE_SRC.playIcon.src} 
            alt={IMAGE_SRC.playIcon.alt} 
            className={styles.playButton}
            onClick={() => setIsPlaying(true)}
          />
        </div>
      )}
    </div>
  </div>
  );
}


// // URL에서 videoId만 추출
// function extractVideoId(url?: string) {
//   if (!url) return "";
//   const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
//   return match ? match[1] : "";
// }
