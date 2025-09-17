import { EMOTION_TEXTS, EMOTION_COLORS } from './constants.js';

/**
 * 감정 상태값을 한국어 텍스트로 변환
 * @param {string} emotion - 감정 상태 문자열 (예: 'happy', 'sad')
 * @returns {string} 한국어로 변환된 감정 텍스트
 */
export function getEmotionText(emotion) {
    return EMOTION_TEXTS[emotion] || '기타';
}

/**
 * 감정 상태에 대응하는 색상 코드를 반환
 * @param {string} emotion - 감정 상태 문자열
 * @returns {string} 16진수 색상 코드
 */
export function getEmotionColor(emotion) {
    return EMOTION_COLORS[emotion] || '#333';
}

/**
 * DOM 요소에 감정에 따른 CSS 클래스를 적용
 * 기존 감정 클래스를 모두 제거하고 새로운 감정 클래스 추가
 * @param {HTMLElement} element - CSS 클래스를 적용할 DOM 요소
 * @param {string} emotion - 적용할 감정 상태
 */
export function applyEmotionClass(element, emotion) {
    const emotions = ['happy', 'sad', 'surprised', 'angry', 'other'];
    emotions.forEach(em => element.classList.remove(em));
    
    element.classList.add(emotion);
} 