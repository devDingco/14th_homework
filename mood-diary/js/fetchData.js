// 0. dog api 이미지 패치함수
const fetchData = async () => {
  try {
    const res = await fetch(DOG_IMAGES_10)
    if (!res.ok) throw new Error(`[${res.status}] API 호출 오류`)
    
    const { message: imageUrls, status } = await res.json()

    if(status !== 'success') throw new Error(`API 응답이 올바르지 않습니다. (status: ${status})`)
    return imageUrls
  } catch (err) {
    console.error(err)
  }
}

// 1. dog-gallery 호출 후 innerHTML에 div 태그 삽입 함수
const addSkeleton = (count = 10) => {
  const dogGallery = document.getElementById('dog-gallery')
  dogGallery.innerHTML =
    Array.from({ length: count })
    .map(()=> `<div class="skeleton default"></div>`).join('')
}

// 2
// datafetch 실행 + skeleton 삽입
// image 태그 생성 후 로드 시, skeleton div와 교환
const showDogImages = async () => {
  addSkeleton()
  const dogImageUrls = await fetchData()

  const skeletons = document.querySelectorAll('.skeleton')

  const count = dogImageUrls.length
  for (let i = 0; i < count; i++) {
    const image = new Image()
    image.src = dogImageUrls[i]

    image.onload = () => {
      skeletons[i]?.replaceWith(image)
      image.classList.add('dog-img','default')
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
      break
    case 'photo-box':
      photoBox.classList.add('active')
      photoBox.classList.remove('inActive')
      photoComponent.style.display = 'block'

      diaryBox.classList.add('inActive')
      diaryBox.classList.remove('active')
      diaryComponent.style.display = 'none'

      showDogImages()
      break
  }
}

// 4. filter에서 선택된 값 가져온 후, setImageRatio 함수 호출
const selectedRatio = () => {
  const ratio = document.getElementById("dropdown-ratio").value
  const dogGallery = document.querySelectorAll('.dog-img')

  dogGallery.forEach(dogImage => setImageRatio(dogImage, ratio))
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

