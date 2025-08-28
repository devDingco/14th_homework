export function isEmptyObj(obj) {
  for (let key in obj) {
    if (obj[key]) return false
  }
  return true
}

export const getButtonStyleByColor = (color) => {
  switch (color) {
    case 'default':
      return
    case 'blue':
      return {
        backgroundColor: '#2974E5',
        color: 'var(--color-white)',
        border: 'none',
      }
    case 'black':
      return {
        backgroundColor: 'var(--color-black)',
        color: 'var(--color-black)',
        border: 'none',
      }
  }
}
