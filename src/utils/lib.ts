export function convertBytes(bytes: number) {
  if (!bytes) return null
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`
}
