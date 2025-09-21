import Image from 'next/image'

export default function AdminBadgeListItem({ el }) {
  console.log('🚀 ~ AdminBadgeListItem ~ el:', el)

  const { name, description, image_url } = el
  return (
    <div>
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
