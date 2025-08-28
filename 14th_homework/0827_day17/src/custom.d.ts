// src/custom.d.ts

declare module '*.svg' {
    // src 타입은 문자열이므로 string으로 지정
    const src: string;
    export default src;
  }
  
  declare module '*.png' {
    // src 타입은 문자열이므로 string으로 지정
    const src: string;
    export default src;
  }

  declare module '*.jpg' {
    const src: string;
    export default src;
  }