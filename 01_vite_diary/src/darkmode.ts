const darkModeEl = document.querySelector('#darkmodeBtn')! as HTMLInputElement;
const bodyEl = document.querySelector('body')! as HTMLBodyElement;

const toggleDarkMode = (e: Event) => {
  console.log((e.target as HTMLInputElement).checked ? '켜짐' : '꺼짐');
  bodyEl.classList.toggle('dark');
};

darkModeEl.addEventListener('click', toggleDarkMode);
