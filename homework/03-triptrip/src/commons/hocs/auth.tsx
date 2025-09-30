import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

// P는 Props 타입의 이름(관례상 P = Props)
export function withAuth<P extends object>(
    Component: React.ComponentType<P> // 함수형 또는 클래스형 컴포넌트 허용
): React.FC<P> {                   // 이 HOC는 P를 받는 함수형 컴포넌트를 반환
    return function AuthComponent(props: P) {
        const router = useRouter()

        useEffect(() => {
            if(!localStorage.getItem("accessToken")){
                alert("로그인 후 이용 가능합니다.")
                router.push('/boards')
            }
        },[])

        return <Component {...props} />
    }

}

// export function withAuth<P extends React.JSX.IntrinsicAttributes>(Component: React.ComponentType<P>) {
//     return function AuthComponent(props: P) {
//         const router = useRouter()


//         useEffect(() => {
//             if(!localStorage.getItem("accessToken")){
//                 alert("로그인 후 이용 가능합니다.")
//                 router.push('/boards')
//             }
//         },[])

//         return <Component {...props} />
//     }

// }


