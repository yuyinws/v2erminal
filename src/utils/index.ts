export function replaceContent(content: string) {
  return content.replaceAll('\r', '')?.replaceAll('\n', '').replaceAll('-', '')
}

export * from './config'
export * from './fetch'
