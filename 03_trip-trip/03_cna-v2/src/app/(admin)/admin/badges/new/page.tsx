import { useAuthGuard } from 'commons/hooks/useAuthGuard'
import AdminBadgeForm from 'components/admin-badges/admin-badge-form'

// [관리자 페이지] 새 배지 등록사이트
export default function AdminBadgeNewPage() {
  useAuthGuard()
  return (
    <>
      <AdminBadgeForm />
    </>
  )
}
