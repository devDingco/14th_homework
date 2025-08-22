// 0. dog api 이미지 패치함수
const fetchData = async () => {
  try {
    const res = await fetch(DOG_IMAGES_10)
    if (!res.ok) throw new Error(`[${res.status}] API 호출 오류`)

    const { message: imageUrls, status } = await res.json()

    if (status !== 'success') throw new Error(`API 응답이 올바르지 않습니다. (status: ${status})`)
    return imageUrls
  } catch (err) {
    console.error(err)
  }
}

// 1. dog-gallery 호출 후 innerHTML에 div 태그 삽입 함수
const addSkeleton = (count = 10) => {
  const checked = document.querySelector('input[name="dropdown"]:checked')
  const ratio = checked.id || 'default'
  const dogGallery = document.getElementById('dog-gallery')
  dogGallery.innerHTML += Array.from({ length: count })
    .map(() => `<div class="skeleton ${ratio}"></div>`)
    .join('')
}

// 2
// datafetch 실행 + skeleton 삽입
// image 태그 생성 후 로드 시, skeleton div와 교환
const showDogImages = async () => {
  addSkeleton()
  const dogImageUrls = await fetchData()

  const skeletons = document.querySelectorAll('.skeleton')
  const ratio = document.querySelector('input[name="dropdown"]:checked')?.id || 'default'

  const count = dogImageUrls.length
  for (let i = 0; i < count; i++) {
    const image = new Image()
    image.src = dogImageUrls[i]

    image.onload = () => {
      skeletons[i]?.replaceWith(image)
      image.classList.add('dog-img', ratio)
    }
  }
}

// 3
// 클릭: 일기보관함 <-> 사진보관함
// navigator active, inActive 전환
// diary-component, photo-component 끄고 키기
const toggleComponent = (id) => {
  const diaryBox = document.getElementById('diary-box')
  const photoBox = document.getElementById('photo-box')
  const paginationArea = document.querySelector('.pagination')

  const diaryComponent = document.getElementById('diary-component')
  const photoComponent = document.getElementById('photo-component')

  switch (id) {
    case 'diary-box':
      diaryBox.classList.add('active')
      diaryBox.classList.remove('inActive')
      diaryComponent.style.display = 'block'

      photoBox.classList.add('inActive')
      photoBox.classList.remove('active')
      photoComponent.style.display = 'none'
      paginationArea.style.display = 'flex'
      break
    case 'photo-box':
      photoBox.classList.add('active')
      photoBox.classList.remove('inActive')
      photoComponent.style.display = 'block'

      diaryBox.classList.add('inActive')
      diaryBox.classList.remove('active')
      diaryComponent.style.display = 'none'
      paginationArea.style.display = 'none'
      showDogImages()
      break
  }
}

// 4. dropdown에서 선택된 값 가져온 후, setImageRatio 함수 호출
const selectRatio = (event) => {
  const ratioId = event.target.id
  const ratioLabel = getRatioLabel(ratioId) ?? '기본'
  document.getElementById('dropdown-ratio').style = `--dropdown-photo-title: "${ratioLabel}"`
  document.getElementById('dropdown-ratio').click()

  const dogGallery = document.querySelectorAll('.dog-img')

  dogGallery.forEach((dogImage) => setImageRatio(dogImage, ratioId))
}

// 5. 기본형 <-> 가로형 <-> 세로형 변환 함수
const setImageRatio = (dogImage, ratio) => {
  switch (ratio) {
    case 'default':
      dogImage.classList.add('default')
      dogImage.classList.remove('horizontal', 'vertical')
      break
    case 'horizontal':
      dogImage.classList.add('horizontal')
      dogImage.classList.remove('default', 'vertical')
      break
    case 'vertical':
      dogImage.classList.add('vertical')
      dogImage.classList.remove('default', 'horizontal')
      break
  }
}

let scrollTimer = null
const infiniteScroll = () => {
  const photoBox = document.getElementById('photo-box')
  const isPhotoBox = photoBox.classList.contains('active')

  if (!isPhotoBox) return
  if (scrollTimer) return
  scrollTimer = setTimeout(() => {
    scrollTimer = null
  }, 1000)

  const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight

  const scrollPercent = scrollTop / (scrollHeight - clientHeight)
  if (scrollPercent <= 0.99) return
  showDogImages()
}
window.addEventListener('scroll', infiniteScroll)
