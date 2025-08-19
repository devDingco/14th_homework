const darkModeEl = document.querySelector('#darkmodeBtn')! as HTMLInputElement;

const toggleDarkMode = (e: Event) => {
  console.log((e.target as HTMLInputElement).checked ? '켜짐' : '꺼짐');
};

darkModeEl.addEventListener('click', toggleDarkMode);
