// MOOD 관련 format 함수
const getMoodImage = (mood) => {
  return MOOD_IMAGES[mood]
}

const getMoodLabel = (mood) => {
  return MOOD_KOR[mood]
}

const getMoodFontColor = (mood) => {
  return MOOD_FONT_COLOR[mood]
}

//시간 관련 format 함수
const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()

  return `${year}. ${month}. ${date}`
}

// diaryList 출력 양식에 맞추기
const formattedDiary = (obj) => {
  const { id, mood, title, contents, date } = obj
  
  return {
    id: id,
    mood: getMoodLabel(mood),
    title: title,
    contents: contents,
    image: getMoodImage(mood),
    color: getMoodFontColor(mood),
    date: date
  }
}

const getDiary = (id) => {
  return diaryList.filter((diary)=>diary.id === +id)
}