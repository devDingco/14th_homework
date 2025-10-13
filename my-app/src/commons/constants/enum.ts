import colors from "@/commons/constants/color";

export enum Emotion {
  Happy = "Happy",
  Sad = "Sad",
  Angry = "Angry",
  Surprise = "Surprise",
  Etc = "Etc",
}

export type EmotionSize = "m" | "s";

export type EmotionMeta = {
  label: string; // 화면에 표시될 한글 라벨
  color: string; // color token (e.g., colors.red[600])
  icons: Record<EmotionSize, string>; // 사이즈별 아이콘 경로
};

export const EMOTION_META: Record<Emotion, EmotionMeta> = {
  [Emotion.Happy]: {
    label: "행복해요",
    color: colors.red[600],
    icons: {
      m: "/icons/emotion-happy-m.svg",
      s: "/icons/emotion-happy-s.svg",
    },
  },
  [Emotion.Sad]: {
    label: "슬퍼요",
    color: colors.blue[600],
    icons: {
      m: "/icons/emotion-sad-m.svg",
      s: "/icons/emotion-sad-s.svg",
    },
  },
  [Emotion.Angry]: {
    label: "화나요",
    color: colors.gray[600],
    icons: {
      m: "/icons/emotion-angry-m.svg",
      s: "/icons/emotion-angry-s.svg",
    },
  },
  [Emotion.Surprise]: {
    label: "놀랐어요",
    color: colors.yellow[600],
    icons: {
      m: "/icons/emotion-surprise-m.svg",
      s: "/icons/emotion-surprise-s.svg",
    },
  },
  [Emotion.Etc]: {
    label: "기타",
    color: colors.green[600],
    icons: {
      m: "/icons/emotion-etc-m.svg",
      s: "/icons/emotion-etc-s.svg",
    },
  },
};

export const EMOTIONS: Emotion[] = [
  Emotion.Happy,
  Emotion.Sad,
  Emotion.Angry,
  Emotion.Surprise,
  Emotion.Etc,
];

export const getEmotionLabel = (emotion: Emotion): string =>
  EMOTION_META[emotion].label;

export const getEmotionColor = (emotion: Emotion): string =>
  EMOTION_META[emotion].color;

export const getEmotionIcon = (
  emotion: Emotion,
  size: EmotionSize = "m"
): string => EMOTION_META[emotion].icons[size];


