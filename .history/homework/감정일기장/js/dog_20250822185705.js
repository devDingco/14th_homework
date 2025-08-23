document.addEventListener(DOMcontentload);
const 강아지불러오는기능 = () => {
  fetch('https://dog.ceo/api/breeds/image/random/3').then((받아온결과) => {
    받아온결과.json().then((객체만뽑힌결과) => {
      console.log(객체만뽑힌결과);

      const 이미지다운로드주소들 = 객체만뽑힌결과.message;
      const 상태 = 객체만뽑힌결과.status;
      console.log(`메세지: ${이미지다운로드주소들}`);
      console.log(`상태: ${상태}`);
      document.getElementById('강아지보여주는곳').innerHTML =
        이미지다운로드주소들
          .map((el) => ` <img src="${el}" width='300px' />`)
          .join('');
    });
  });
};
