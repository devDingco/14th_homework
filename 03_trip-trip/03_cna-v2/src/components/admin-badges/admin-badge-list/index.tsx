'use client'
import { supabase } from 'commons/libraries/supabase'
import AdminBadgeListItem from '../admin-badge-list-item'
import { useEffect, useState } from 'react'

export interface Badge {
  id: string
  name: string
  description?: string
  image_url: string
  created_at: string
  deleted_at?: string
}

export default function AdminBadgeList() {
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const { data } = await supabase.from('badges').select('*')
        setBadges(data ?? [])
      } catch (error) {
        console.error('배지 조회 실패:', error)
        alert('배지 조회에 실패했습니다.')
      }
    }

    fetchBadges()
  }, [])

  return (
    <>
      {badges.map((el) => {
        return <AdminBadgeListItem key={el.id} el={el} />
      })}
    </>
  )
}
