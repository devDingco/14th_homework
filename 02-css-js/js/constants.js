/**
 * 감정 상태를 나타내는 문자열 상수들
 * CSS 클래스명과 JavaScript 로직에서 일관되게 사용됨
 */
export const EMOTIONS = {
    HAPPY: 'happy',
    SAD: 'sad',
    SURPRISED: 'surprised',
    ANGRY: 'angry',
    OTHER: 'other'
};

/**
 * 감정 상태에 대응하는 한국어 텍스트
 * UI에 표시되는 사용자 친화적인 텍스트
 */
export const EMOTION_TEXTS = {
    [EMOTIONS.HAPPY]: '행복해요',
    [EMOTIONS.SAD]: '슬퍼요',
    [EMOTIONS.SURPRISED]: '놀랐어요',
    [EMOTIONS.ANGRY]: '화나요',
    [EMOTIONS.OTHER]: '기타'
};

/**
 * 감정 상태별 색상 코드
 * 카드 디자인과 UI 요소의 시각적 표현에 사용됨
 */
export const EMOTION_COLORS = {
    [EMOTIONS.HAPPY]: '#EA5757',
    [EMOTIONS.SAD]: '#28B4E1',
    [EMOTIONS.SURPRISED]: '#D59029',
    [EMOTIONS.ANGRY]: '#777777',
    [EMOTIONS.OTHER]: '#A229ED'
};

 