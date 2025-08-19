export const setTime = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Time is up!');
  }, 3000);
});
