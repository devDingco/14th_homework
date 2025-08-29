declare module '*.svg' {
  import * as React from 'react'

  // ReactComponent import 방식 지원
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>

  // 기본 import (url) 지원
  const src: string
  export default src
}
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}
