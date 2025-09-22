import Image from 'next/image'
import { useRouter } from 'next/navigation'

// TODO: 스타일 입히기
export default function AdminBadgeListItem({ el }) {
  // console.log('🚀 ~ AdminBadgeListItem ~ el:', el)
  const router = useRouter()
  const handleNavigate = (id) => {
    router.push(`/admin/badges/${id}`)
  }

  const { id, name, description, image_url } = el
  return (
    <div style={{ border: 'solid 1px red', cursor: 'pointer' }} onClick={() => handleNavigate(id)}>
      <p>이름: {name}</p>
      <p>설명: {description}</p>
      <p>
        이미지:
        {image_url && image_url !== '{}' && (
          <Image
            src={`https://storage.googleapis.com/${image_url}`}
            alt="업로드된 이미지"
            width={20}
            height={20}
          />
        )}
      </p>
    </div>
  )
}
