const selectFilterMenu = Array.from(document.querySelectorAll('.dropdown-menu-item')) as HTMLInputElement[];

if (selectFilterMenu) {
  selectFilterMenu.forEach((item) => {
    item.addEventListener('click', () => {
      const value = item.innerText;
      const url = new URL(window.location.href);
      url.searchParams.set('category', value);
      window.location.href = url.toString();
    });
  });
}
