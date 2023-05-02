export function formatFileNameToShort(fileName: string) {
  const fileNameWithoutPrefix = fileName.substring(
    fileName.lastIndexOf('.') + 1,
  )

  const fileNameShort = `photo.${fileNameWithoutPrefix}`

  return fileNameShort
}
