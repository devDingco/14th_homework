import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import ApolloSetting from '@/shared/api/apollo/provider'

export const metadata: Metadata = {
  title: 'TripTrip',
  description: 'TripTrip web',
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})
interface RootProps {
  children: React.ReactNode
}
export default function RootLayout(props: RootProps) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <ApolloSetting>{props.children}</ApolloSetting>
      </body>
    </html>
  )
}
