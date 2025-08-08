const isValid = () => {
  const mood = document.querySelector('input[name="mood"]:checked')?.value
  const title = document.getElementById('title').value.trim()
  const contents = document.getElementById('contents').value.trim()

  return mood && title && contents
}

const checkContents = () => {
  document.getElementById("submit-button").disabled = !isValid()
}