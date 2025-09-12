export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const datePart = dateString.split('T')[0]
  return datePart.replace(/-/g, '.')
}
