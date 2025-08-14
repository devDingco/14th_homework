async function getPhotoList() {
  const res = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await res.json();
  const photoList = data.message;

  console.log(photoList);
  console.log(url);

  return photoList;
}

getPhotoList();
