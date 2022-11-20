export function replaceContent(content: string) {
  return content.replaceAll('\r', '')?.replaceAll('\n', '').replaceAll('-', '')
}
