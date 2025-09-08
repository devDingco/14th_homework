'use client'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Image src={'/images/notFound.png'} width={500} height={700} alt="Not Found" />
    </div>
  )
}
